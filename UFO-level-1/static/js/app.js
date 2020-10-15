var tbody=d3.select('tbody');
var inp_date=d3.select('#datetime');
var inp_city=d3.select('#city');
var inp_state=d3.select('#state');
var inp_country=d3.select('#country');
var inp_shape=d3.select('#shape');
var button=d3.select('#filter-btn');
var logger={counter:0};
var thead=d3.select('thead');
headers=['Date','City','State','Country','Shape','Duration','Comments'];
form=d3.select('form');

function submit(){
    var filtered=data;
    var inpv_date=inp_date.property('value');
    var inpv_city=inp_city.property('value').toLowerCase();
    var inpv_state=inp_state.property('value').toLowerCase();
    var inpv_country=inp_country.property('value').toLowerCase();
    var inpv_shape=inp_shape.property('value').toLowerCase();
    console.log(inpv_date);
    console.log(inpv_city);
    values=[inpv_city,inpv_date]
    d3.event.preventDefault();
    function filter_date(sighting){
        if(inpv_date===""){
            console.log('empty value');
            return sighting;
        }
        else{
            return sighting.datetime==inpv_date;
        }
    }
    function filter_city(sighting){
        if(inpv_city===""){
            console.log('empty value');
            return sighting;
        }
        else {
            return sighting.city==inpv_city;}
    }
    function filter_state(sighting){
        if(inpv_state===""){
            console.log('empty value');
            return sighting;
        }
        else {
            return sighting.state==inpv_state;}
    }
    function filter_country(sighting){
        if(inpv_country===""){
            console.log('empty value');
            return sighting;
        }
        else {
            return sighting.country==inpv_country;}
    }
    function filter_shape(sighting){
        if(inpv_shape===""){
            console.log('empty value');
            return sighting;
        }
        else {
            return sighting.shape==inpv_shape;}
    }
    funcs=[filter_date,filter_city,filter_country,filter_state,filter_shape];
    for (func of funcs){
            filtered=filtered.filter(func);
    }
    console.log(filtered);
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
form.on('submit',submit);

