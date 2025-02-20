// visit  
//       https://api-mainnet.magiceden.io/v2/ord/btc/runes/collection_stats/search?chain=bitcoin&protocol=rune&limit=50&offset=0&sort=floorPrice&direction=desc&window=1d&searchTerm=sidslogos&allCollections=true
// paste code below in javascript console
// 

// START 

d=[]
function add(a1,a2) { a1.push.apply(a1, a2); }
h=' <table> <tr> <th></th><th>rune</th> <th>price in sats</th> </tr> ' 
end= '</table>'
function fil(r) { return r.rune.substring(0,9)=='SIDSLOGOS' && W[r.rune.substring(9)] == 1  && r.unitPriceSats > 0 }
function sor(r1,r2) { return r2.unitPriceSats-r1.unitPriceSats }
function r2l(r) { return ' <tr> <td><img width="20px" src="'+r.imageURI+'"/></td><td>'+r.etching.runeName+'</td> <td>'+r.unitPriceSats.toLocaleString('en-US').padStart(16,'\xa0')  +'</td></tr> '}

async function bip39() { r = await fetch('https://raw.githubusercontent.com/bitcoin/bips/refs/heads/master/bip-0039/english.txt'); t = await r.text() ; ; return t.split('\n') }
W={};ws= await bip39();ws.pop(); ws.map((w)=>{W[ w.toUpperCase()]=1})

async function g(off) {
	u= 'https://api-mainnet.magiceden.io/v2/ord/btc/runes/collection_stats/search?chain=bitcoin&protocol=rune&limit=50&offset='+off+'&sort=floorPrice&direction=desc&window=1d&searchTerm=sidslogos&allCollections=true'
	r = await fetch(u)
	j= await r.json()
	return j.runes
}

for (i=0;i<10;i++) { t = await g(0+i*50) ; add(d,t) }
o = h + d.filter(fil).sort(sor).map(r2l).join(' ') + end
document.body.insertAdjacentHTML('afterbegin',o)

// END
