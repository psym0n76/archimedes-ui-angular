import * as moment from 'moment';

export function dateFormatter(params): any {
    return moment(params.value).format('DD-MM-YYYY HH:mm:ss');
  }
