console.log(`haha`);
fetch('http://115.28.201.92:8000/api/campus/gym')
    .then(res => res.json())
    .then(res => console.log(res));