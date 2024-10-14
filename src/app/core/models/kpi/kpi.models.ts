import { Injectable } from '@angular/core';
import { KpiService } from '../../services/kpi/kpi.service';
import { Data, Entry, ResultData } from 'src/app/models/entries.model';

@Injectable({
  providedIn: 'root',
})
export class KpiModelService {
  constructor(private entriesService: KpiService) {}

  async fetchEntries(distinctId: string, isDummy:boolean): Promise<Entry[]> {
    const entries$ = await this.entriesService.getEntries(distinctId, isDummy);

    return new Promise((resolve, reject) => {
      entries$.subscribe({
        next: (entriesResponse) => {
          resolve(entriesResponse.data.entries);
        },
        error: (error) => {
          console.error('Error al obtener las entradas:', error);
          reject(error);
        },
      });
    });
  }

  async filterData(distinct_id: string,isDummy:boolean): Promise<Data> {
    return new Promise(async (resolve, reject) => {
      try {
        const entries = await this.fetchEntries(distinct_id,isDummy);
        if (entries && entries.length > 0) {
          const lastEntry = entries[entries.length - 1];

          const filteredData = Object.keys(lastEntry.data)
            .filter(
              (key) => key.includes('cartones') || key.includes('hectolitros')
            )
            .reduce((obj, key) => {
              obj[key] = lastEntry.data[key];
              return obj;
            }, {} as Data);

          resolve(filteredData);
        } else {
          resolve({});
        }
      } catch (error) {
        reject('Error al obtener el último elemento: ' + error);
      }
    });
  }

  async processFilteredData(
    distinct_id: string,
    isDummy:boolean
  ): Promise<{ cartones: any; hectolitros: any }> {
    return new Promise(async (resolve, reject) => {
      try {
        const filteredData = await this.filterData(distinct_id,isDummy);

        const data = {
          cartones: {} as { [key: string]: any },
          hectolitros: {} as { [key: string]: any },
        };

        for (const key of Object.keys(filteredData)) {
          if (key.includes('cartones')) {
            data.cartones[key] = filteredData[key];
          } else if (key.includes('hectolitros')) {
            data.hectolitros[key] = filteredData[key];
          }
        }
        resolve(data);
      } catch (error) {
        console.error('Error al procesar los datos filtrados:', error);
        reject(error);
      }
    });
  }

  async displayProcessedData(distinct_id: string,isDummy:boolean): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await this.processFilteredData(distinct_id,isDummy);

        const filteredData: any = {
          data: {
            cartones: {
              meta_mes: {},
              avance_actual: {},
            },
            hectolitros: {
              meta_mes: {},
              avance_actual: {},
            },
          },
        };

        for (const [key, value] of Object.entries(data.cartones)) {
          if (key.includes('meta_mes')) {
            filteredData.data.cartones.meta_mes[key] = value;
          } else if (key.includes('avance_actual')) {
            filteredData.data.cartones.avance_actual[key] = value;
          }
        }

        for (const [key, value] of Object.entries(data.hectolitros)) {
          if (key.includes('meta_mes')) {
            filteredData.data.hectolitros.meta_mes[key] = value;
          } else if (key.includes('avance_actual')) {
            filteredData.data.hectolitros.avance_actual[key] = value;
          }
        }

        resolve(filteredData);
      } catch (error) {
        console.error('Error al mostrar los datos procesados:', error);
        reject(error);
      }
    });
  }

  async printProcessedData(distinct_id: string, isDummy:boolean) {
    return new Promise((resolve, reject) => {
      this.displayProcessedData(distinct_id,isDummy)
        .then((processedData) => {
          try {
            const structuredData: any = {
              data: {
                cartones: {
                  meta_mes: {},
                  avance_actual: {},
                },
                hectolitros: {
                  meta_mes: {},
                  avance_actual: {},
                },
              },
            };

            const processCategory = (
              dataCategory: any,
              target: any,
              type: string
            ) => {
              for (const [key, value] of Object.entries(dataCategory)) {
                const prefix = key.split(`_${type}`)[0];
                if (!target[prefix]) {
                  target[prefix] = {};
                }
                target[prefix][key] = value;
              }
            };

            processCategory(
              processedData.data.cartones.meta_mes,
              structuredData.data.cartones.meta_mes,
              'meta_mes'
            );
            processCategory(
              processedData.data.cartones.avance_actual,
              structuredData.data.cartones.avance_actual,
              'avance_actual'
            );

            processCategory(
              processedData.data.hectolitros.meta_mes,
              structuredData.data.hectolitros.meta_mes,
              'meta_mes'
            );
            processCategory(
              processedData.data.hectolitros.avance_actual,
              structuredData.data.hectolitros.avance_actual,
              'avance_actual'
            );
            resolve(structuredData);
          } catch (error) {
            reject('Error al procesar los datos: ' + error);
          }
        })
        .catch((error) => {
          reject('Error al obtener los datos procesados: ' + error);
        });
    });
  }

  async consumePrintProcessedData(
    distinct_id: string,
    isDummy:boolean
  ): Promise<{ data: ResultData }> {
    return new Promise(async (resolve, reject) => {
      try {
        const processedData: any = await this.printProcessedData(distinct_id,isDummy);
        const result: { data: ResultData } = {
          data: {
            cartones: [],
            hectolitros: [],
          },
        };

        const modelData = (category: keyof ResultData) => {
          const metaMes = processedData.data[category].meta_mes;
          const avanceActual = processedData.data[category].avance_actual;

          for (const key in metaMes) {
            if (metaMes.hasOwnProperty(key)) {
              const metaMesEntry = metaMes[key];
              const name = key.split('_meta_mes')[0];
              if (avanceActual[name]) {
                const newObj = {
                  name: name,
                  avance:
                    avanceActual[name][`${name}_avance_actual_${category}`],
                  meta: metaMesEntry[`${name}_meta_mes_${category}`],
                };
                result.data[category].push(newObj);
              }
            }
          }
        };
        modelData('cartones');
        modelData('hectolitros');
        resolve(result);
      } catch (error) {
        console.error('Error en consumePrintProcessedData:', error);
        reject(error);
      }
    });
  }
}
