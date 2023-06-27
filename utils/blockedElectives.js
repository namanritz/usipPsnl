

module.exports = func = (studentState,slots) => {
    //console.log(studentState);
    //console.log(slots)
    const be=[];
    for(let sl of slots){
        {
            const s = studentState.currentSubjects.filter(s=>s.slot==sl.name);
            if(s.length>=sl.max){
                be.push(sl.name);
            }
        }
    }
   // console.log(be);
    return be;

}