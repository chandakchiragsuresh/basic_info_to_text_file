const fs = require('fs');

requestHandler = (req, res)=>{
    const method = req.method;
    if(req.url == '/'){
      res.write('<html style="background-color:Tomato;">');
      res.write('<body><form action = "/message" method = "POST" ><label style="font-size:60px;" for="fname">First name:</label><br><input type = "text" name = "name"> <br><label style="font-size:60px;" for= "sname">Surname:</label><br><input type = "text" name = "surname"><br><br><button style="font-size:30px;" type = "submit">Send</button></form></body>');
      res.write('</html>');  
      return res.end();
    }
    else if(req.url == '/message' && method  == 'POST'){
      const arr = [];
      req.on('data', (chunk)=>{
        console.log(chunk);
        arr.push(chunk);
      });
      req.on('end', ()=>{
       const parse = Buffer.concat(arr).toString();  
       console.log(parse);
       console.log('testing');
       fs.writeFile('file.txt', parse, ()=>{
        res.statusCode = 302;
        setTimeout(()=>{
          res.write('<html>');
          res.write('<body><h1>Timer of 2 sec done!</h1></body>');
          res.write('</html>'); 
          return res.end();
        },2000);
        
       });
      });
      res.write('<html>');
      res.write('<body><h1>Operation Sucessful!</h1></body>');
      res.write('</html>');  
     
    }
    else{
    res.write('<html>');
    res.write('<body><h1>${fname}</h1></body>');
    res.write('</html>');  
    res.end();
    }
  };

  module.exports = requestHandler;