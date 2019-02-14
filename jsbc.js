//const SHA256 = require('crypto.js/sha256');
let crypto = require('crypto.js')
class transaction{
    constructor(fromAddress, toAddress, amount){
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}
class block{
    constructor(timestamp, transactions, previousHash  = ''){
            //this.index = index;
            this.timestamp = timestamp;
            this.transactions = transactions;
            this.previousHash = previousHash;
            this.hash = '';
            this.nonce = 0;
    }

    calculateHash(){
        //generate hash
        return crypto.sha256(this.nonce+this.timestamp+this.previousHash+JSON.stringify(this.transactions)).toString(); 
    }
    mineNewBlock(difficulty){
       
        //this.hash = this.calculateHash();
        while(this.hash.substring(0, difficulty) !== Array(difficulty+1).join("0")){
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log("block with nonce: "+this.nonce +", hash is: " +this.hash)
    }
}
 

 class blockChain{
    constructor(){  
        var genesis = new block("09/02/2019", "first block", "0");
        genesis.hash = genesis.calculateHash();
        this.chain = [genesis]; 
        this.difficulty=2;
        this.pendingTransactions = [];
        this.miningReward = 10;
      //  console.log("genesis block created success");
     }
     getLastBlock(){
         return this.chain[this.chain.length-1];
     }
    /* addBlock(newBlock){
         newBlock.previousHash = this.getLastBlock().hash;
         newBlock.mineNewBlock(this.difficulty);
         this.chain.push(newBlock);
     }*/
     minePendingTransaction(rewardAddress){
        let newBlock = new block(Date.now(), this.pendingTransactions, this.getLastBlock().hash );
        //console.log(newBlock.calculateHash());
        newBlock.mineNewBlock(this.difficulty);
        console.log("block mining success");
        this.chain.push(newBlock);
        this.pendingTransactions = [
            new transaction(null, rewardAddress, this.miningReward)  
        ];
    }
    createTransaction(transaction){
        this.pendingTransactions.push(transaction);
    }
    getBalance(address){
        let balance =0;
        for(const block of this.chain){
            for(const trans of block.transactions){
                if(address === trans.fromAddress){
                    balance = balance - trans.amount; 
                }
                if(address === trans.toAddress){
                    balance = balance + trans.amount;
                }
            }
        }
        return balance;
    }
     checkValidityBlock(){

         for( let i=1 ; i< this.chain.length; i++ ){
             let currentBlock = this.chain[i];
             let previousBlock = this.chain[i-1];
             if(currentBlock.previousHash != previousBlock.hash){
                 return false;
             }
             if(currentBlock.hash != currentBlock.calculateHash()){
                 return false;
             }
             else{
                 return true;
             }
        }
    }
  }
let ac_coin = new blockChain();
transaction1 = new transaction("abc", "def", 100);
ac_coin.createTransaction(transaction1);
transaction2 = new transaction("def", "abc", 30);
ac_coin.createTransaction(transaction2);
console.log("mining started");
ac_coin.minePendingTransaction("boi");
console.log(JSON.stringify(ac_coin.getBalance("abc")));
console.log(JSON.stringify(ac_coin.getBalance("def")));
console.log(JSON.stringify(ac_coin.getBalance("boi")));
console.log("mining started");
ac_coin.minePendingTransaction("boi");
console.log(JSON.stringify(ac_coin.getBalance("abc")));
console.log(JSON.stringify(ac_coin.getBalance("def")));
console.log(JSON.stringify(ac_coin.getBalance("boi")));
/*let block1 = new block(1,"09/02/2019", "second block");
let block2 = new block(2,"09/02/2019", "third block");
let blockChain1 = new blockChain();
console.log("first block");
blockChain1.addBlock(block1);
console.log("second block");
blockChain1.addBlock(block2);
console.log(JSON.stringify(blockChain1,null, 1));
console.log("block is valid? " +blockChain1.checkValidityBlock());*/
