module.exports = {
  port: 3200,
  rpcPort:8546,
  nodeRpc:"https://mainnet.infura.io/",//"http://127.0.0.1:"+(process.argv[4]||8546),
  //gucport:'http://192.168.51.203:9000/',

	//https://mainnet.infura.io/metamask
//https://mainnet.infura.io/
//  rpcPort:8546,
//  port:3200,
  session: {
  },
  mongodb: 'mongodb+srv://mosong:password@cluster0-bzfq7.gcp.mongodb.net/test?retryWrites=true&w=majority',
  nodeip:"127.0.0.1"
};
