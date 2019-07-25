module.exports = function (selectVer) {
    return { 
        dev: Object.assign(
			{"port":"3200"},
			{"rpcport":"1"},
			{"nodeRpc":"http://192.168.51.203:9999"},
			{"mongodb":'mongodb+srv://mosong:321mosong321@cluster0-bzfq7.gcp.mongodb.net/test?retryWrites=true&w=majority'},
			{"dbname":"dbtest"},
			{"dbcollection":"verdict"},
			{"nodeip":"127.0.0.1"}),
        prod: Object.assign(
			{"port":"3200"},
			{"rpcport":"2"},
			{"nodeRpc":"http://192.168.51.203:9999"},
			{"mongodb":"mongodb+srv://mosong:321mosong321@cluster0-bzfq7.gcp.mongodb.net/test?retryWrites=true&w=majority"},
            {"dbname":"dbtest"},
            {"dbcollection":"lawtest"},			
			{"nodeip":"127.0.0.1"})
    }[selectVer ||'dev'];
}
