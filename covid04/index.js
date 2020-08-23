#!/usr/bin/env node
const fs = require('fs');
const csvParser = require('csv-parser');
const sequelize = require('./utils/database')
const Paper = require('./models/paper')
const Bib_entry = require('./models/bib_entry')
const Ref_entry = require('./models/ref_entry')
const Text = require('./models/text')
const Abstract = require('./models/abstract')
const Author = require('./models/author')
const Cite_span = require('./models/cite_span')
const Ref_span = require('./models/ref_span')
const Util_funcs = require('./utils/utilfunctions')



/* async function start(){
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}



start();
 */
 /* sequelize
 .sync()
 .then(result => {
     console.log(result);
 })
 .catch(err => {
     console.log(err);
 }); */   






const filepath = '../sample_files/'

const csvFile = filepath + 'Book1.csv'

console.log(csvFile)


fs.createReadStream(csvFile)
    .on('error', () => {
        
        // handle error
    })

    .pipe(csvParser())
    .on('data', (row) => {
        //console.log(row)

        console.log(row.sha)
        console.log(filepath+'document_parses/pdf_json/'+row.sha+'.json')
        let jsonfile = fs.readFileSync(filepath+'document_parses/pdf_json/'+row.sha+'.json');
        //let jsonfile = fs.readFileSync('../sample_files/document_parses/pdf_json/06ced00a5fc04215949aa72528f2eeaae1d58927.json');
        let paper = JSON.parse(jsonfile);
        
        const {paper_id, 
            metadata,
            abstract,
            body_text,
            bib_entries,
            ref_entries,
            back_matter} = paper 
        
        const {title, authors} = metadata

        Author.belongsTo(Paper);
        Paper.Authors = Paper.hasMany(Author);
        Abstract.belongsTo(Paper);
        Paper.abstracts = Paper.hasMany(Abstract)
        Bib_entry.belongsTo(Paper);
        Paper.Bib_entries = Paper.hasMany(Bib_entry);
        Ref_entry.belongsTo(Paper);
        Paper.Ref_entries = Paper.hasMany(Ref_entry);
        Paper.Texts = Paper.hasMany(Text);
        Text.belongsTo(Paper);
        
        Text.Cite_span = Cite_span.belongsTo(Text);
        //Paper.Texts.Cite_spans = Text.hasMany(Cite_span);
        
        Paper.Texts.Cite_spans = Text.hasMany(Cite_span); 


        Paper.create({
            title: title,
            paper_id: paper_id,


            cord_uid: row.cord_uid,
            sha : row.sha,
            source_x : row.source_x,
            doi : row.doi,
            pmcid : row.pmcid,
            pubmed_id : row.pubmed_id,
     
            licence : row.license,
            abstract : row.abstract,
            publish_time : row.publish_time,
    
            journal : row.journal,
            mag_id : row.mag_id,
            who_covidence_id : row.who_covidence_id,
            arxiv_id : row.arxiv_id,
            pdf_json_files : row.pdf_json_files,
            pmc_json_files : row.pmc_json_files,
            s2_id : row.sw_id,



            authors:
        
            authors.map(element =>{
                var entries =
                {
                    first: element.first,
                    middle: element.middle[0],
                    last:element.last,
                    suffix: element.suffix,
                    email: element.email,
        
                    laboratory: element.affiliation.laboratory,
                    institution: element.affiliation.institution,
                    settlement: Util_funcs(element.affiliation.location, 'settlement'),
                    region: Util_funcs(element.affiliation.location, 'region' ),
                    country: Util_funcs(element.affiliation.location, 'country' )
                }
                return entries
            }),
            abstracts:
            abstract.map(element =>{
                var entries =
                {
                    text: element.text,
                    section: element.section
        
                }
                return entries
            }),
            texts: 
            body_text.map(element =>{
                var entries =
                {
                    text: element.text,
                    section: element.section,
                    cite_spans:
                    element.cite_spans.map(element1 =>{
                        var entries1 =
                        {
                            start: element1.start,
                            end: element1.end,
                            txt: element1.text,
                            ref_id: element1.ref_id
                        }
                        console.log(entries1)
                        return entries1
        
                    })
        
                }
                return entries
            }),
        
            bib_entries: 
            Object.entries(bib_entries).map(element =>{
                var entries = 
                {
                    title: element[1].title ,
                    ref_id: element[1].ref_id,
                    year: element[1].year,
                    venue: element[1].venue,
                    volume: element[1].volume,
                    issn: element[1].issn,
                    pages: element[1].pages,
                    other_ids: JSON.stringify(element[1].other_ids)
                }
                return entries
        
            }),
        
            ref_entries:
            Object.entries(ref_entries).map(element =>{
                var entries = 
                {
                    name: element[1].name ,
                    text: element[1].text,
                    latex: element[1].latex,
                    type: element[1].type
                   
                }
                return entries
        
            })
            //fig_refs:
            //Object.entries(fig_)
            
        }, {
            
            include:[
             Paper.Authors,
                Paper.abstracts,
                Paper.Texts,
                Paper.Bib_entries,
                Paper.Ref_entries,
                Paper.Texts.Cite_spans]}
           
        )
        .then (result => {
            console.log('Created Paper');
        })
        .catch(err => {
            console.log(err);
        }) 

       // console.log(authors)
    })

    .on('end', () => {
        // handle end of CSV
    })


 //const [{first, middle:[], last, suffix, affiliation:{laboratory, institution,
//            location:{settlement,region,country}},
//            email}] = authors


/* console.log (authors[0].middle[0])
console.log(Object.keys(abstract[0].cite_spans).length)
if (Object.keys(abstract[0].cite_spans).length == 0)
{
    console.log("zero elements");
}
else 
{
    console.log(abstract[0].cite_spans[0].start)
}
body_text.forEach(element => {
    console.log(element.text)
    
});
body_text[0].cite_spans.forEach(element => {
    console.log(element.start);
    console.log(element.end);
    console.log(element.text);
    console.log(element.ref_id);
    
});

Object.entries(bib_entries).forEach(element => {
    console.log(element[0]);
    console.log(element[1].year);
 

});


Object.entries(ref_entries).forEach(element => {
    console.log(element[0]);
    console.log(element[1].latex);
    console.log(element[1].type);
}); */

// console.log(back_matter);
// Object.entries(back_matter).forEach(element => {
//     console.log(element[1].text);
//     //console.log(element.cite_spans);
//     //console.log(element.ref_spans);

// });

//const [{text,citespans:[],
//    ref_spans:[]}] = abstract


//console.log(abstract);            
//const [{citespans:[start,end, text,ref_id],
//    ref_spans:[abrstart,abrend,abrtext,abrref_id],section}] = abstract


//const [{text,cite_spans:[cstart,cend,ctext,cref_id],
//    ref_spans:[rstart,rend,rtext,rref_id],section}] = body_text



//console.log(title);
//console.log(authors);

//body_text.forEach((txt) => { console.log(txt.cite_spans); })


//const chalk = require("chalk");

//const boxen = require("boxen");
//const yargs = require("yargs");

//const greeting = chalk.white.bold("Hello!");


//const boxenOptions = {
// padding: 1,
// margin: 1,
// borderStyle: "round",
// borderColor: "green",
// backgroundColor: "#555555"
//};
//const msgBox = boxen( greeting, boxenOptions );

//console.log(msgBox);


//const options = yargs
// .usage("Usage: -n <name>")
// .option("n", { alias: "name", describe: "Your name", type: "string", demandOption: true })
// .argv;

//const greeting2 = `Hello, ${options.name}!`;

//console.log(greeting2); 
//