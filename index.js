var text = `Barry Manilow may claim to write the songs, but it was    
William Shakespeare who coined the phrases - he contributed more "
phrases and sayings  to the language than any other "  
individual, and sayings to the English language in daily use. Here's a " 
collection of wellknown quotations that are associated with " 
Shakespeare. Most of these were the Bard's own work but he wasn't "
the wellknown quotation is that associated for insane `


//var pattern = "Most of these were the Bard's own" //%100
//var pattern = "Most of these the Bard's own"  // %50
//var pattern = "Most these were the Bard's own" //%83
var pattern = "quotation that associated for insane" //%80

let chunk=""
let temp= ""
let slicePattern=0
let we_find_it = false
let moduloResultArr = []  

/***************************************************************
 * function : maximumIncrementalSequence
 * in a given array, it finds the maximum sequential array
 * for example: [1,2,6,7,8] => 3
 * for example:[1,2,3,6,7] => 3
 * *************************************************************/
maximumIncrementalSequence = arg => {
  let max =[]
  let newArg = []
  let count= 0
  let elseBool = false
  

  arg.forEach(element => {
      if(element === -1)
        newArg.push(-10)
      else
        newArg.push(element)
  })
  let first = newArg.slice(0,newArg.length-1)
  let second = newArg.slice(1,newArg.length)
  for(let i=0;i<first.length;i++){
         exist = second[i]-first[i]
         if(elseBool){
          max.push(count)
          count=0
          elseBool = false
        }
        if(exist === 1) {
          count++
          if(i == first.length-1) max.push(count)
        }
        else elseBool = true
    }
   if(count!=0)max.push(count)
   return Math.max(...max)
}

/***************************************************************
 * function : isFilter
 * find the weight of percentage of sentence occurs in file
 * *************************************************************/
isFilter = (source,destination)=> {
       
   let result = destination.split(' ').map(element => source.split(' ').indexOf(element))
   if(result.filter(element => element === -1).length === result.length)
    return 0
    
   let incementalCount = maximumIncrementalSequence(result)
   return (incementalCount+1) / result.length
}


/***************************************************************
 * function : parseMultiSpace
 * multispace can prevent to find the right match 
 * *************************************************************/
parseMultiSpace = str => {
  let s = str.trim().split(' ')
  return s.reduce((prev,next) => {
      if(next === "")
         return prev
      else return prev.concat(" ",next)
  })
}


/***************************************************************
 * function : isFilterResult
 * source: text pattern
 * destination:sentence which will be find
 * if destination is all occurs in text it will return true
 * *************************************************************/
isFilterResult = (source,destination)=> {
   let exist = 0
   let _destination = destination.split(' ')
   let _source = source.split(' ')
   let result = _destination.map(element => _source.indexOf(element))
   if(result.includes(-1)) return false
   else{
     for(let i=0,j=1;i<result.length-1,j<result.length;i++,j++){
        exist = Math.abs(result[j]-result[i]) + exist
    }
    if(exist === result.length-1) return true
    else return false
   }
}


/***************************************************************
 * function : executeContext
 * source: text pattern
 * shows the result of exact match 
 * *************************************************************/
executeContext = (text,pattern) => {
let slicePattern =0
pattern = parseMultiSpace(pattern)
for(let i=0;i<text.length;i=i+pattern.length){
   chunk = text.substr(i,pattern.length)
   if(chunk !== pattern){
     temp = temp.concat(chunk)
     if(temp.length != pattern.length){
       let tempPattern = temp.split(' ').slice(slicePattern)
       moduloResultArr= []
       for(j=1;j<tempPattern.length;j++){
         let newIteratifTemp = tempPattern.slice(j).join(' ')
         if(newIteratifTemp.length < pattern.length)break
         if(isFilterResult(newIteratifTemp,pattern)){
            console.log("we find it with %100") 
            we_find_it =true
            break
         }
         else{
           moduloResultArr.push(isFilter(newIteratifTemp,pattern))
         }
       }
       slicePattern++
       if(we_find_it) break
     }
   }
   else {
      console.log("we find it with %100") 
      we_find_it =true
      break
   }
}
if(!we_find_it){
  console.log("we find it with %",100*Math.max(...moduloResultArr))
}
}

executeContext(text,pattern)
