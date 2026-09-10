export type Place = {id:number;name:string;region:string;address:string;detail:string};
type Point={longitude:number;latitude:number};
const approach:Record<number,string>={1:'서울특별시 종로구 율곡로2길',4:'서울특별시 성북구 동소문동2가 130-2',15:'안산 상록수역',23:'양평읍',30:'인천 부평공원',32:'대전 보라매공원',37:'천안 신부공원',42:'서천 봄의마을',43:'논산시민공원',44:'홍주읍성',48:'속초 엑스포공원',52:'남원 사랑의광장',55:'여수 이순신광장',56:'순천 조례호수공원',57:'목포근대역사관',60:'해남공원',62:'담양 중앙공원',64:'광주광역시 남구 양림동 52-4',66:'부산학생교육문화회관',74:'창원 오동동문화광장',79:'제주특별자치도 제주시 정원로 50'};
export function locationQuery(p:Place){return approach[p.id]||p.address.replace(/^\(갱신\)\s*/, '').replace(/\s*일원$/, '');}
export async function resolvePoint(p:Place):Promise<Point>{
 if(p.id===34)return {latitude:36.49633,longitude:127.27339};
 const q=locationQuery(p);
 const params=new URLSearchParams({f:'json',singleLine:q,sourceCountry:'KOR',outFields:'Addr_type,Match_addr',maxLocations:'5',forStorage:'false'});
 const response=await fetch(`https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?${params}`,{signal:AbortSignal.timeout(15000)});
 if(!response.ok)throw new Error(`${p.name}: 위치 조회에 실패했습니다. 잠시 뒤 다시 시도해 주세요.`);
 const data=await response.json() as {candidates?:Array<{score:number;location:{x:number;y:number};attributes:{Addr_type:string};address:string}>};
 const candidates=(data.candidates||[]) as Array<{score:number;location:{x:number;y:number};attributes:{Addr_type:string};address:string}>;
 const result=candidates.find(c=>c.score>=95&&['PointAddress','StreetAddress','StreetName','POI'].includes(c.attributes.Addr_type)&&Number.isFinite(c.location.x)&&Number.isFinite(c.location.y)&&c.location.x>=124&&c.location.x<=132&&c.location.y>=33&&c.location.y<=39.5);
 if(!result)throw new Error(`${p.name}: 가이드 위치를 자동으로 확인하지 못했습니다. 잘못된 장소로 연결하지 않도록 길찾기를 중단했습니다.`);
 return {longitude:result.location.x,latitude:result.location.y};
}
export function buildNaverTransitUrl(start:Place,a:Point,end:Place,b:Point){
 const token=(p:Place,c:Point)=>{
  if(!Number.isFinite(c.longitude)||!Number.isFinite(c.latitude)||Math.abs(c.latitude)>=85)throw new Error('잘못된 좌표입니다.');
  const x=c.longitude*Math.PI/180*6378137;
  const y=Math.log(Math.tan(Math.PI/4+c.latitude*Math.PI/360))*6378137;
  return `${x.toFixed(3)},${y.toFixed(3)},${encodeURIComponent(p.name.replaceAll(',', '©'))},,SIMPLE_POI`;
 };
 return `https://map.naver.com/p/directions/${token(start,a)}/${token(end,b)}/-/transit`;
}
