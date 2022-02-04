const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

class ApiService {
  #endPoint = null;
  #authorization = null;

  constructor(endPoint, authorization) {
    this.#endPoint = endPoint;
    this.#authorization = authorization;
  }

  get points () {
    return this.#load({url: 'points'})
      .then(ApiService.parseResponse);
  }

  get destinations () {
    return this.#load({url: 'destinations'})
      .then(ApiService.parseResponse);
  }

  get offers () {
    return this.#load({url: 'offers'})
      .then(ApiService.parseResponse);
  }


  updatePoint = async (point) => {
    const response = await this.#load({
      url: `points/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    const parsedResponse = await ApiService.parseResponse(response);
    return parsedResponse;
  }

  addPoint = async (point) => {
    const response = await this.#load({
      url: 'points',
      method: Method.POST,
      body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  deletePoint = async (point) => {
    const response = await this.#load({
      url: `points/${point.id}`,
      method: Method.DELETE,
    });

    return response;
  }


  #load = async ({
    url,
    method = Method.GET,
    body = null,
    headers = new Headers(),
  }) => {
    headers.append('Authorization', this.#authorization);

    const response = await fetch(
      `${this.#endPoint}/${url}`,
      {method, body, headers},
    );

    try {
      ApiService.checkStatus(response);
      return response;
    } catch (err) {
      ApiService.catchError(err);
    }
  }

   #adaptToServer = (point) => {
     const adaptedTripPoint = {...point,
       'base_price': point.price,
       'date_from': point.startDate.toISOString(),
       'date_to': point.endDate.toISOString(),
       'destination': point.destination,
       'is_favorite': point.isFavorite,
       'type': point.eventType,
     };

     // Ненужные ключи мы удаляем
     delete adaptedTripPoint.eventDuration;
     delete adaptedTripPoint.eventDate;
     delete adaptedTripPoint.isFavorite;
     delete adaptedTripPoint.startDate;
     delete adaptedTripPoint.endDate;
     delete adaptedTripPoint.eventType;

     return adaptedTripPoint;
   }

  static parseResponse = (response) => response.json();

  static checkStatus = (response) => {
    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
  }

  static catchError = (err) => {
    throw err;
  }
}

export { ApiService };
