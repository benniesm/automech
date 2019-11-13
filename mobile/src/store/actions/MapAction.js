const setCoords = (data) => {
  return {
    type: 'COORDINATES',
    coords: data
  }
}

const setMarkers = (data) => {
  return {
    type: 'MARKERS',
    marks: data
  }
}

export { setCoords, setMarkers };
