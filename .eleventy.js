const stringify = require('javascript-stringify').stringify;
const markdown = require('markdown-it')({html:true});

module.exports = function( eleventyConfig ){

    // Copy the /img directory
    eleventyConfig.addPassthroughCopy("src/assets/img");
    eleventyConfig.addPassthroughCopy("src/assets/styles/*.css*");
    eleventyConfig.addPassthroughCopy("src/assets/fonts");
    eleventyConfig.addPassthroughCopy("src/assets/js");
    eleventyConfig.addPassthroughCopy("src/admin");
    eleventyConfig.addPassthroughCopy("src/web.config");
    
    // Filter source file names using a glob
    eleventyConfig.addCollection("system", function(collection) {
        let content  = collection.getFilteredByGlob("src/system/*.md");
        return content;
    });

    eleventyConfig.addCollection("systemList", function(collection) {
        let systems  = collection.getFilteredByGlob("src/system/*.md").map(system => system.data.title);

        systems = systems.sort( (a,b) => {
            if(a < b) { return -1; }
            if(a > b) { return 1; }
            return 0;
        });

        return systems;
    });
    
    // Filter source file names using a glob
    eleventyConfig.addCollection("systemAndTags", function(collection) {
        
        // Get list of all tags (we want to do this per system)
        let tempArray = [];
        // Get all Docs
        let tempDocs = collection.getFilteredByGlob("src/docs/*.md");
        // Get distinct list of Systems
        let tempSystemList = [...new Set(tempDocs.map( doc => { return doc.data.system_title;}))];

        // For each system check the existing tags
        let combinedArray = [];
        for (let i = 0; i < tempSystemList.length; i++) {
            const system = tempSystemList[i];
            
            // Get a list of the tags for specified System
            let systemTags = [...new Set(tempDocs
                .filter(doc => doc.data.system_title == system)
                .map(doc => doc.data.tag ))];

            // Add a pairing for every system and tag 
            for (let i = 0; i < systemTags.length; i++) {
                const tag = systemTags[i];
                combinedArray.push({
                    system: system,
                    tag: tag
                });
            }
        }
        return combinedArray;
    });

     // Filter source file names using a glob
     eleventyConfig.addCollection("integration", function(collection) {
        let content  = collection.getFilteredByGlob("src/integration/*.md");
        return content;
    });
    
     // Filter source file names using a glob
     eleventyConfig.addCollection("user", function(collection) {
        let content  = collection.getFilteredByGlob("src/user/*.md");
        return content;
    });

    // Filter source file names using a glob
    eleventyConfig.addCollection("docs", function(collection) {
        let content  = collection.getFilteredByGlob("src/docs/*.md");
        return content;
    });

    // Filter source file names using a glob
    eleventyConfig.addCollection("homePostFeed", function(collection) {
        let content  = [...collection.getFilteredByGlob("src/docs/*.md")]
                        .reverse()
                        .slice(0,9);
        return content;
    });

    // Utility Filter for troubleshooting
    eleventyConfig.addFilter('console', function(value) {
        const output = stringify(value, null, "\t", { maxDepth: 3 });
        console.log(output);

        return '';
    });

    // Take string and render markdown
    eleventyConfig.addFilter('markdown', function(value) {
        const output = markdown.render(value);
        return output;
    });

    // Take string and render markdown
    eleventyConfig.addFilter('customlink', function(value) {
        let link = value;

        // Check if the link start with a protocol
        const regex = /:\/\//g; // if it has :// from https://
        const found = link.match(regex);
        
        if ( !found ) {
            link = "https://" + link
        }
        return link;
    });

    return {
        dir: { 
            input: 'src', 
            output: 'dist', 
            includes: '_includes' 
        }
    };

}
