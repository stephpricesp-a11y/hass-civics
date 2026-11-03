// Shared original manga scenes are reused where the subject is the same.
// They illustrate the action, not an answer hint. Labels carry the exact meaning.
const visualSubjects=['Council workers clearing a roadside drain','An adult checking a community hall','Adults sharing a local access map','Students in red uniforms learning safely at school','School staff checking arrival arrangements','Emergency coordinators using a radio and map','A logistics worker with a supply truck and boxes','A volunteer supporting an accessible supply delivery','Workers inspecting and repairing a local road','A public hospital with an accessible entrance','Government partners reviewing recovery funding','Students and adults discussing community information'];
const outcomeSubjects=['Clear drains and a checked access path','Families using a safe temporary learning entrance','Accessible deliveries at a community hub','A repaired street with another route awaiting inspection','Staff checking services while temporary learning continues','Logistics teams checking supplies and outstanding needs','Government partners clarifying their shared plan','Families using restored accessible school paths','Students sharing a responsibility display with a mentor'];
const actionTiles=[[0,1,5],[4,3,10],[6,10,6],[8,1,5],[5,8,10],[7,6,2],[8,8,3],[9,3,1],[10,8,11]];
const actionOutcomes=[[0,'c1',6],[1,4,6],[5,5,6],[0,'c1',6],[1,3,6],[2,5,6],[7,3,6],[7,4,6],[7,3,6]];
const extraTiles=[[8,8,2],[4,3,4],[8,10,10]];
const extraOutcomes=[[0,3,6],[4,7,4],[3,6,7]];
function escapeVisual(s){return String(s).replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');}
const panelFiles={choice:{src:'assets/manga-choices.png',width:1024,height:1536,x:[[5,338],[346,680],[688,1020]],y:[[4,360],[368,733],[741,1112],[1120,1531]]},outcome:{src:'assets/manga-outcomes.png',width:1254,height:1254,x:[[4,414],[422,834],[841,1250]],y:[[4,414],[421,832],[839,1250]]},story:{src:'assets/manga-story-red.png',width:2172,height:724,x:[[8,2166]],y:[[6,231],[248,468],[485,718]]}};
let panelSerial=0;
function panelViewport(kind,tile){const f=panelFiles[kind],cols=f.x.length,x=f.x[tile%cols],y=f.y[Math.floor(tile/cols)],clip='panel-clip-'+(++panelSerial);return `<svg class="panel-viewport" xmlns="http://www.w3.org/2000/svg" viewBox="${x[0]} ${y[0]} ${x[1]-x[0]} ${y[1]-y[0]}" preserveAspectRatio="${kind==='story'?'xMidYMid slice':'xMidYMid meet'}" aria-hidden="true" focusable="false"><defs><clipPath id="${clip}" clipPathUnits="userSpaceOnUse"><rect x="${x[0]}" y="${y[0]}" width="${x[1]-x[0]}" height="${y[1]-y[0]}"/></clipPath></defs><image href="${f.src}" x="0" y="0" width="${f.width}" height="${f.height}" clip-path="url(#${clip})"/></svg>`;}
function storyPicture(phase){return panelViewport('story',phase);}
function picture(tile,kind='choice',extraClass=''){const alt=(kind==='choice'?visualSubjects:outcomeSubjects)[tile];return `<span class="manga-picture ${kind==='choice'?'choice-atlas':'outcome-atlas'} ${extraClass}" role="img" aria-label="Manga illustration: ${escapeVisual(alt)}">${panelViewport(kind,tile)}</span>`;}

function actionPicture(i,option){return picture(actionTiles[i][option.original]);}
function followPicture(text){const t=text.toLowerCase();const tile=/school|education|qualified|inspectors/.test(t)?3:/hospital|health/.test(t)?9:/federal|national|tax|parliament/.test(t)?10:/emergency|state/.test(t)?5:/community|residents|families/.test(t)?11:2;return picture(tile,'choice','follow-picture');}
function sortPicture(i){return picture([0,5,6,1,9,8,3,10][i],'choice','sort-picture');}
function outcomePicture(i,option){const tile=actionOutcomes[i][option.original];return typeof tile==='string'?picture(Number(tile.slice(1)),'choice','outcome-picture'):picture(tile,'outcome','outcome-picture');}
function illustratedOutcome(i,option){return `<figure class="outcome-figure">${outcomePicture(i,option)}<figcaption>${escapeVisual(option.effect)}</figcaption></figure>`;}
function extraOutcome(i,k){return `<figure class="outcome-figure">${picture(extraOutcomes[i][k],'outcome','outcome-picture')}<figcaption>${escapeVisual(extraRounds[i].options[k][1])}</figcaption></figure>`;}

const heroPanel=document.querySelector('.hero-art .comic-scene');if(heroPanel) heroPanel.innerHTML=storyPicture(0);
