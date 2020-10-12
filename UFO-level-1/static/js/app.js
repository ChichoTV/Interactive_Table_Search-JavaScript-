var tbody=d3.select('tbody');
var datab=data;
var inp=d3.select('#datetime');
var button=d3.select('#filter-btn');
var logger={counter:0};
var thead=d3.select('thead');
headers=['Date','City','State','Country','Shape','Duration','Comments'];

function submit(){
    var inpv=inp.property('value');
    console.log(inpv);
    function filtering(sighting){
        return sighting.datetime==inpv;
    }
    var filtered=datab.filter(filtering);
    if (logger.counter==0){
    filtered.forEach(obj =>{
        var row=tbody.append('tr');
        Object.entries(obj).forEach(val => {
            var tdata=row.append('td');
            tdata.text(val);
            logger.counter=logger.counter+1;
        })
    })}
    else if (logger.counter>0){
        var to_remove=d3.selectAll('tr').remove();
        var head_row=thead.append('tr');
        headers.forEach(head =>{
            var head_data=head_row.append('th');
            head_data.text(head);
        })
        var temp=d3.selectAll('th');
        temp.classed('table-head',true);
        filtered.forEach(obj =>{
            var row=tbody.append('tr');
            Object.entries(obj).forEach(val => {
                var tdata=row.append('td');
                tdata.text(val);
        })
    })}
}
console.log(logger.counter);
button.on('click', submit);

