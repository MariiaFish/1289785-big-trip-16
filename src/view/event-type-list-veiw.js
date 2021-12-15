import { getLowerCaseEventType } from '../mock/utils/utils.js';

const createEventTypesList = (types) => (
  `<div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>
                        ${types.map((type) => `<div class="event__type-item">
                          <input id="event-type-${getLowerCaseEventType(type)}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${getLowerCaseEventType(type)}">
                          <label class="event__type-label  event__type-label--${getLowerCaseEventType(type)}" for="event-type-${getLowerCaseEventType(type)}-1">${type}</label>
                        </div>`).join(' ')}
                      </fieldset>
                    </div>`
);

export { createEventTypesList };
