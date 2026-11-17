export const brainParts=[
 ['Cerebrum','Forebrain sensory integration, association and voluntary motor functions.'],
 ['Hypothalamus','Forebrain regulation including hunger/fullness and pituitary control.'],
 ['Pituitary gland','Endocrine gland below the hypothalamus; secretes growth hormone and other hormones.'],
 ['Midbrain','Brainstem region participating in visual/auditory reflexes, including pupil control.'],
 ['Pons','Hindbrain relay and contribution to breathing regulation.'],
 ['Medulla','Hindbrain regulation of vital involuntary functions, including breathing and blood-pressure control.'],
 ['Cerebellum','Hindbrain coordination, precision, posture and balance.'],
 ['Spinal cord','Sensory/motor conduction and coordination of some reflex circuits.'],
 ['Cranium','Bony protection around the brain; not a nervous processing region.']
] as const;
export const glandParts=[['Hypothalamus','Releasing hormones regulate the pituitary.'],['Pineal gland','Melatonin helps coordinate circadian timing (research extension).'],['Pituitary gland','Growth hormone supports regulated growth and development.'],['Thyroid gland','Thyroxin supports metabolism; iodine is required for synthesis.'],['Parathyroid glands','Parathyroid hormone regulates calcium (research extension).'],['Thymus','Supports T-cell development (research extension).'],['Adrenal glands','Adrenaline supports emergency responses.'],['Pancreas','Beta cells release insulin, helping regulate blood glucose.'],['Testes','Testosterone supports reproductive development.'],['Ovaries','Oestrogens support reproductive development and menstrual-cycle regulation.']] as const;
export type PlantMode='shoot'|'gravity'|'touch'|'tendril';
export function plantResponse(mode:PlantMode,stage:number,fromLeft=true){if(!Number.isInteger(stage)||stage<0||stage>3)throw new Error('Use stages0–3');const fraction=stage/3;return {fraction,bend:(fromLeft?-1:1)*fraction*60,leafAngle:mode==='touch'?fraction*65:0,newGrowth:mode!=='touch',mechanism:mode==='touch'?'Water redistribution changes turgor; no growth or muscles.':mode==='shoot'?'Shaded-side shoot elongation produces a light-directed bend.':mode==='gravity'?'Root growth with gravity; shoot growth against gravity.':'Contact side grows less; outer side grows more, curving around support.'};}
export const insulinStages=[['Disturbance','Blood glucose rises above its usual regulated level.'],['Detection and release','Pancreatic beta cells detect the rise and increase insulin secretion.'],['Target response','Insulin promotes uptake/storage in suitable target tissues, helping glucose fall.'],['Reduced stimulus','As glucose falls, the stimulus for insulin release decreases: negative feedback.']] as const;
export function hormoneTarget(hasReceptor:boolean){return hasReceptor?'Suitable receptor → the cell can respond to the signal.':'No suitable receptor → no direct response to this hormone in the model.';}
