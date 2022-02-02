const Method = {
  GET: 'GET',
  PUT: 'PUT',
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


  updatePoint = async (points) => {
    const response = await this.#load({
      url: `tripPoints/${points.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(points)),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
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

   #adaptToServer = (tripPoint) => {
     const adaptedTripPoint = {...tripPoint,
       'base_price': tripPoint.price,
       'date_from': tripPoint.startDate.toISOString(),
       'date_to': tripPoint.endDate.toISOString(),
       'destination': tripPoint.destination,
       'is_favorite': tripPoint.isFavorite,
       'type': tripPoint.eventType,
     };

     // Ненужные ключи мы удаляем
     delete tripPoint.eventDuration;
     delete tripPoint.eventDate;

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
