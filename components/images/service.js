const ImagesDAO = require('./private/dao');

const fs = require('fs');
const probe = require('probe-image-size');

class ImagesService {
  getOneImage (query){
    return new Promise ((resolve, reject) => {
      return ImagesDAO.getOneData(query).then(data =>{
        resolve(data)
      }).catch(err => {
        reject({
          err: 'error'
        })
      })
    })
  }
  getImage(query, limit, offset) {
    return new Promise((resolve, reject) => {
      return ImagesDAO.getData(query, limit, offset).then(image => {
        resolve(image);

      }).catch(err => {
        reject({
          err: 'error'
        })
      })
    })
  }

  uploadImage(file, options) {
    options = options || {};
    return new Promise((resolve, reject) => {

      if (!file || !file.buffer) {
        return reject('err');
      }
      let image = probe.sync(file.buffer);
      console.log('tatul');
      if (!image) {
        return reject('err');
      }

      let img = {
        image: file.buffer,
        content_type: image.content_type,
        size: file.size,
        width: image.width,
        height: image.height
      }
console.log('========', img);
      ImagesDAO.insertData(img).then(data =>{
        resolve(data);
      }).catch(err => {
        reject({
          err: 'error'
        })
      })
    })
  }

  removeImage(id) {
    return new Promise((resolve, reject) => {
      ImagesDAO.removeData(id).then(data => {
        resolve(data);
      }).catch(err => {
        err: 'error'
      })
    })
  }
}

module.exports = new ImagesService();
