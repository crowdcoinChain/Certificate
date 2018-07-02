let mongoose = require('mongoose');

function check_or_update_database(payload, sesssion, time_s) {

  // check if the the hash is present in the database in any coinbase
  // it its not present then it start a new function that inser the hash in a new block

  // connect to the database
  let block_number=scan_blockchain(payload);
  // close the connection with the database
  if (scan_blockchain(payload)>0) block_number=insert_hash_next_block(payload);
  return block_info(block_number);
}

function insert_hash_next_block(payload){
  let block_number=1;

  return block_number
}


function scan_blockchain(payload){
  // this create a dependacy with an explorer iquidus installed and running properly
  let block_number=-1;


  return block_number // if -1 means not found
}

function block_info(block_number){

  return json_info // return a json with the info of the block
}
