const bluebird = require('bluebird');
async function main(){
  console.log('waiting...')
  await bluebird.delay(3000)  //then
  console.log('done!')
}
main()