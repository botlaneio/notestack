// Schematic curves follow the crossings, turning points and tangencies on pp. 17–18.
const graphs: {curve: (x: number) => number; description: string}[] = [
  {curve: () => 2, description: 'A horizontal line stays above the x-axis.'},
  {curve: x => .12*(x-3)*(x*x+3*x+4), description: 'Both turning points lie below the axis before the curve crosses on the right.'},
  {curve: x => .16*(x+2.5)*(x-1)*(x-3), description: 'A cubic crosses once on the left and twice on the right.'},
  {curve: x => .8*(x+3)*(x+1), description: 'An upward parabola crosses twice to the left of the origin.'},
  {curve: x => -.09*(x+4)*(x+1)*(x-.5)*(x-3.5), description: 'Two peaks lie above the axis and the valley between them lies below it. There are four crossings.'},
  {curve: x => .022*(x+3.5)*(x+1.5)**2*(x-2)**2, description: 'The curve crosses on the left, then touches the axis at a negative and a positive x-coordinate.'},
  {curve: x => .18*(x+2)*(x*x-2.5*x+2.5), description: 'A cubic crosses on the left. Both of its turning points stay above the axis.'},
  {curve: x => -.45*(x+1)*(x-3), description: 'A downward-opening parabola crosses on either side of the origin.'},
  {curve: x => .16*(x+2)*(x-.75)*(x-2.75), description: 'A cubic crosses at three distinct points.'},
  {curve: x => x-2, description: 'A rising straight line crosses the axis to the right of the origin.'},
  {curve: x => .5*(x-1.5)**2, description: 'An upward parabola touches the axis once to the right of the origin.'},
  {curve: x => -.15*(x+1.5)*(x-.5)*(x-1.75)*(x-3.5), description: 'A curve with two peaks crosses the axis at four distinct points.'},
];

export function PolynomialBookGraph({index}:{index:number}){
 const fn=graphs[index].curve;const points=Array.from({length:241},(_,i)=>{const x=-5+i/24;return `${180+x*30},${160-fn(x)*25}`}).join(' ');
 return <figure><svg viewBox="0 0 360 320" role="img" aria-label={`Reconstructed polynomial graph ${index%6+1}. Count its distinct intersections or touches with the horizontal x-axis.`} style={{width:'100%',maxWidth:440,background:'#f4f7fc',borderRadius:16}}><defs><clipPath id={`graph-${index}`}><rect x="15" y="15" width="330" height="290"/></clipPath></defs><path d="M15 160H345M180 15V305" stroke="#67778a"/><text x="337" y="153">x</text><text x="188" y="25">y</text><text x="166" y="177">O</text><polyline points={points} fill="none" stroke="#3156a1" strokeWidth="3" clipPath={`url(#graph-${index})`}/></svg><figcaption>Graph {index%6+1}. Count distinct x-coordinates, including touches. Reconstructed schematic; not to scale.</figcaption><details><summary>Text description of the graph</summary><p>{graphs[index].description}</p></details></figure>;
}
