export function starchPrediction(light:boolean,chlorophyll:boolean,co2:boolean,water=true){return {newStarch:light&&chlorophyll&&co2&&water,limiting:[!light&&'light',!chlorophyll&&'chlorophyll',!co2&&'carbon dioxide',!water&&'water'].filter(Boolean) as string[]};}
export const digestiveStops=[
 {name:'Mouth',role:'Chewing and mixing; salivary amylase begins starch breakdown. Saliva also moistens food.'},
 {name:'Oesophagus',role:'Peristalsis moves the bolus toward the stomach; this is a transport passage.'},
 {name:'Stomach',role:'Muscular mixing, acidic HCl conditions for pepsin and protein digestion; mucus protects the lining.'},
 {name:'Small intestine',role:'Bile emulsifies fat; pancreatic and intestinal enzymes complete digestion. Villi absorb products; lacteals carry much absorbed fat.'},
 {name:'Large intestine',role:'Additional water absorption; remaining undigested material forms faeces.'},
 {name:'Anus',role:'Sphincter-controlled egestion of undigested material, distinct from metabolic excretion.'}
];
export function respirationRoute(route:'aerobic'|'yeast'|'muscle'){if(!['aerobic','yeast','muscle'].includes(route))throw new Error('Unknown pathway');return {first:'Glucose (6C) → 2 pyruvate (3C each), in cytoplasm',products:route==='aerobic'?'6 CO2 + water; more ATP overall':route==='yeast'?'2 ethanol (2C each) + 2 CO2; less ATP overall':'2 lactate (3C each); less ATP overall',later:route==='aerobic'?'Oxygen-dependent mitochondrial pathway':'Fermentation in cytoplasm',carbons:route==='aerobic'?[6]:route==='yeast'?[4,2]:[6]};}
export const humanBloodRoute=[
 {name:'Body tissues',oxygen:'O2 delivered to tissues; CO2 enters blood'},
 {name:'Venae cavae',oxygen:'Oxygen-poor return to heart'},
 {name:'Right atrium',oxygen:'Receives systemic venous blood'},
 {name:'Right ventricle',oxygen:'Pumps toward lungs'},
 {name:'Pulmonary artery',oxygen:'Oxygen-poor blood, away from heart'},
 {name:'Lung capillaries',oxygen:'O2 enters blood; CO2 leaves for alveoli'},
 {name:'Pulmonary veins',oxygen:'Oxygen-rich blood, toward heart'},
 {name:'Left atrium',oxygen:'Receives blood from lungs'},
 {name:'Left ventricle',oxygen:'Pumps toward body'},
 {name:'Aorta',oxygen:'Oxygen-rich systemic artery'}
];
export function waterBalance(filtered:number,reabsorbed:number){if(!Number.isFinite(filtered)||!Number.isFinite(reabsorbed)||filtered<=0||reabsorbed<0||reabsorbed>filtered)throw new Error('Reabsorbed water must be between zero and initial filtrate');return {urine:filtered-reabsorbed,percent:100*reabsorbed/filtered};}
export const neuronRoute=['Receptor / dendritic input','Cell body','Axon','Axon terminal','Chemical synapse','Next cell'];
export const reflexRoute=['Receptor','Sensory neuron','Spinal relay','Motor neuron','Muscle effector'];
export function signalStage(mode:'neuron'|'reflex',position:number){const route=mode==='neuron'?neuronRoute:reflexRoute;if(!Number.isInteger(position)||position<0||position>=route.length)throw new Error('Unknown signal stage');return {label:route[position],chemical:mode==='neuron'&&position===4,brainAlsoInformed:mode==='reflex'};}
export function plantTransport(source:string,sink:string){const valid=['Leaf','Stored root','Growing bud','Fruit'];if(!valid.includes(source)||!valid.includes(sink)||source===sink)throw new Error('Choose distinct model source and sink');return {from:source,to:sink,tissue:'Phloem',loadingUsesEnergy:true};}
