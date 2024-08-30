import script from './puppeteerScriptHotpot.js'


// usage for script
const call = (prompt)=>{
    return script(prompt);
}
console.log(call("India in 1950s"));