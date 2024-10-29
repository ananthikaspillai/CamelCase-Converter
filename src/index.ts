function toCamelCase(value:string){
    if (!value) return "";

    const camelcases = value.split(/[\s_-]+/);

    return camelcases
    .map((camelcase,index) =>
        index ===0 ? camelcase.toLowerCase() : camelcase.charAt(0).toUpperCase()+camelcase.slice(1).toLowerCase())
    .join("");
   
}
   console.log( toCamelCase("hello_world")) // Returns: "helloWorld"
    console.log(toCamelCase("HELLO-WORLD") )// Returns: "helloWorld"
    console.log(toCamelCase("Hello World")) // Returns: "helloWorld"
    console.log(toCamelCase("HelloWorld")) // Returns: "helloWorld"
    console.log(toCamelCase("JSON_data_format")) // Returns: "jsonDataFormat"
    console.log(toCamelCase("")) // Returns: ""
    console.log(toCamelCase("already_camelCase")) // Returns: "alreadyCamelCase"
    console.log(toCamelCase("multiple___underscores")) // Returns: "multipleUnderscores
