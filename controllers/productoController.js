let db = require('../models/dbconexion');
var fs = require('fs');


let productos = {
  listar( req, res ){
    let sql = "SELECT * FROM productos";
    db.query(sql,function(err, result){
      if( err ){
        console.log(err);
        res.sendStatus(500);
      }else{
        res.json(result);
      }
    });
  },
  store(req, res ){
    
    val_nombre = req.body.nombre;    
    val_precio = req.body.precio;
    val_marca = req.body.marca;
    val_cantidad = req.body.cantidad;
    
    var file = req.files.file;
    var tmp_path = file.path;
    var target_path = './public/images/' + file.name;
    //console.log(tmp_path);
    console.log(target_path);
    console.log(file.name);
    let val_archivo = file.name;
    let val_ruta = target_path;

    fs.copyFile(tmp_path,target_path,function(err)
    {
        if (err) throw err;        
        fs.unlink(tmp_path, function() {
          if (err) throw err;
          res.status(200).send('File uploaded to: ' + target_path);          
        });
            
    });  
    let sql = "INSERT INTO productos(nombre,precio,marca,cantidad,archivo,ruta) VALUES(?,?,?,?,?,?)";
    db.query(sql,[val_nombre,val_precio,val_marca,val_cantidad,val_archivo,val_ruta],function(err, newData){
      if(err){
        console.log(err);
        res.sendStatus(500);
      }else{
        res.json(newData);
      }
    });
  },
  show( req, res ){
    val_id = req.params.id;
    let sql = "SELECT * FROM productos WHERE id=?";
    db.query(sql,[val_id],function(err, rowData){
      if(err){
        console.log(err);
        res.sendStatus(500);
      }else{
        res.json(rowData);
      }
    });
  },
  edit( req, res ){
    val_id = req.body.id;
    val_nombre = req.body.nombre;    
    val_precio = req.body.precio;
    val_marca = req.body.marca;
    val_cantidad = req.body.cantidad;
    val_archivo = req.body.archivo;
    val_ruta = req.body.ruta;
    let sql = "UPDATE productos SET nombre=?,precio=?,marca=?,cantidad=? WHERE id=?";
    db.query(sql,[val_nombre,val_precio,val_marca,val_cantidad,val_archivo,val_ruta,val_id],function(err, newData){
      if(err){
        res.sendStatus(500);
      }else{
        res.json(newData);
        
      }
    });
  },
  delete( req, res ){
    val_id = req.params.id;
    let sql = "DELETE FROM productos WHERE id=?";
    db.query(sql,[val_id],function(err, newData){
      if(err){
        res.sendStatus(500);
      }else{
        res.sendStatus(200);
      }
    });
  }
}
module.exports = productos;