
module.exports = async function handleErrors(errObj){
  if (errObj===null) {
    return console.log(`An error has occured, but failed to audit.`)
  }
  let message = (errObj.message) ? errObj.message : `Error Handler Error: No Error Message`
  let fix = (errObj.fix) ? errObj.fix : `Error Handler Error: Missing Fix`
  return console.log(`An Error has Occured!\n\nError: ${message}\nFix: ${fix}`)
}
