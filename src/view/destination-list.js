const createDestinationPointsListTemplate = (points) => (
  `<datalist id="destination-list-1">
                    ${points.map((point) => `<option value="${point}"></option>`)}
                    </datalist>`
);

export {createDestinationPointsListTemplate};
