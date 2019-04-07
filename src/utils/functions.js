const normalizeLineData = line => ({
  lineId: line.cl,
  from: line.sl === 1 ? line.ts : line.tp,
  to: line.sl === 1 ? line.tp : line.ts,
  number: `${line.lt}-${line.tl}`,
  direction: line.sl === 1 ? 'going' : 'back',
  latLngPaths: [],
});

export default {
  normalizeLineData,
};
