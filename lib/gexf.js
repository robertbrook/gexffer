/* gexf.js - Gexf library for JavaScript. - Version: 0.2.5 - Author: Guillaume Plique - medialab SciencesPo */
(function(e){"use strict";function t(e){var t={id:e.id,label:e.label};return e.viz&&(t.viz=e.viz),e.attributes&&(t.attributes=e.attributes),t}function i(e){var t={id:e.id,type:e.type||"undirected",label:e.label||"",source:e.source,target:e.target,weight:+e.weight||1};return e.viz&&(t.viz=e.viz),e.attributes&&(t.attributes=e.attributes),t}function r(e){function r(){var e={};return h.els.meta?(e.lastmodifieddate=h.els.meta.getAttribute("lastmodifieddate"),s.nodeListEach(h.els.meta.childNodes,function(t){e[t.tagName.toLowerCase()]=t.textContent}),e):e}function n(e){var t=[];return h.els.model[e]&&s.nodeListEach(h.els.model[e],function(e){var i={id:e.getAttribute("id")||e.getAttribute("for"),type:e.getAttribute("type")||"string",title:e.getAttribute("title")||""},r=s.nodeListToArray(e.childNodes);r.length>0&&(i.defaultValue=r[0].textContent),t.push(i)}),t.length>0?t:!1}function a(e,t){var i={},r=t.getElementsByTagName("attvalue"),n=s.nodeListToHash(r,function(e){var t=s.namedNodeMapToObject(e.attributes),i=t.id||t["for"];return{key:i,value:t.value}});return e.map(function(e){i[e.id]=!(e.id in n)&&"defaultValue"in e?s.enforceType(e.type,e.defaultValue):s.enforceType(e.type,n[e.id])}),i}function o(e){var i=[];return s.nodeListEach(h.els.nodes,function(r){var n={id:r.getAttribute("id"),label:r.getAttribute("label")||""};e&&(n.attributes=a(e,r)),h.hasViz&&(n.viz=d(r)),i.push(t(n))}),i}function d(e){var t={},i=s.getFirstElementByTagNS(e,"viz","color");if(i){var r=["r","g","b","a"].map(function(e){return i.getAttribute(e)});t.color=s.getRGB(r)}var n=s.getFirstElementByTagNS(e,"viz","position");n&&(t.position={},["x","y","z"].map(function(e){t.position[e]=+n.getAttribute(e)}));var a=s.getFirstElementByTagNS(e,"viz","size");a&&(t.size=+a.getAttribute("value"));var o=s.getFirstElementByTagNS(e,"viz","shape");return o&&(t.shape=o.getAttribute("value")),t}function l(e,t){var r=[];return s.nodeListEach(h.els.edges,function(n){var o=s.namedNodeMapToObject(n.attributes);"type"in o||(o.type=t),e&&(o.attributes=a(e,n)),h.hasViz&&(o.viz=u(n)),r.push(i(o))}),r}function u(e){var t={},i=s.getFirstElementByTagNS(e,"viz","color");if(i){var r=["r","g","b","a"].map(function(e){return i.getAttribute(e)});t.color=s.getRGB(r)}var n=s.getFirstElementByTagNS(e,"viz","shape");n&&(t.shape=n.getAttribute("value"));var a=s.getFirstElementByTagNS(e,"viz","thickness");return a&&(t.thickness=+a.getAttribute("value")),t}var h={};h.els={root:e.getElementsByTagName("gexf")[0],graph:e.getElementsByTagName("graph")[0],meta:e.getElementsByTagName("meta")[0],nodes:e.getElementsByTagName("node"),edges:e.getElementsByTagName("edge"),model:s.getModelTags(e)},h.hasViz=!!s.getAttributeNS(h.els.root,"xmlns","viz"),h.version=h.els.root.getAttribute("version")||"1.0",h.mode=h.els.graph.getAttribute("mode")||"static";var c=h.els.graph.getAttribute("defaultedgetype");h.defaultEdgetype=c||"undirected";var f=n("node"),g=n("edge"),p={version:h.version,mode:h.mode,defaultEdgeType:h.defaultEdgetype,meta:r(),model:{},nodes:o(f),edges:l(g,h.defaultEdgetype)};return f&&(p.model.node=f),g&&(p.model.edge=g),p}function n(e,t){var i=function(){if(window.XMLHttpRequest)return new XMLHttpRequest;var e,t;if(window.ActiveXObject){e=["Msxml2.XMLHTTP.6.0","Msxml2.XMLHTTP.3.0","Msxml2.XMLHTTP","Microsoft.XMLHTTP"];for(t in e)try{return new ActiveXObject(e[t])}catch(i){}}return null}();if(!i)throw"XMLHttpRequest not supported, cannot load the file.";var r,n="function"==typeof t;return i.overrideMimeType?(i.overrideMimeType("text/xml"),r=function(e){return e.responseXML}):r=function(e){var t=new DOMParser;return t.parseFromString(e.responseText,"application/xml")},i.open("GET",e,n),n&&(i.onreadystatechange=function(){4===i.readyState&&t(r(i))}),i.send(),n?i:r(i)}function a(e){return r(e)}function o(e,t){return"function"==typeof t?n(e,function(e){t(r(e))}):r(n(e))}var s={getModelTags:function(e){var t,i=e.getElementsByTagName("attributes"),r={},n=i.length;for(t=0;n>t;t++)r[i[t].getAttribute("class")]=i[t].childNodes;return r},nodeListToArray:function(e){for(var t=[],i=0,r=e.length;r>i;++i)"#text"!==e[i].nodeName&&t.push(e[i]);return t},nodeListEach:function(e,t){for(var i=0,r=e.length;r>i;++i)"#text"!==e[i].nodeName&&t(e[i])},nodeListToHash:function(e,t){for(var i={},r=0;r<e.length;r++)if("#text"!==e[r].nodeName){var n=t(e[r]);i[n.key]=n.value}return i},namedNodeMapToObject:function(e){for(var t={},i=0;i<e.length;i++)t[e[i].name]=e[i].value;return t},getFirstElementByTagNS:function(e,t,i){var r=e.getElementsByTagName(t+":"+i)[0];return r||(r=e.getElementsByTagNameNS(t,i)[0]),r||(r=e.getElementsByTagName(i)[0]),r},getAttributeNS:function(t,i,r){var n=t.getAttribute(i+":"+r);return n===e&&(n=t.getAttributeNS(i,r)),n===e&&(n=t.getAttribute(r)),n},enforceType:function(e,t){switch(e){case"boolean":t="true"===t;break;case"integer":case"long":case"float":case"double":t=+t;break;case"liststring":t=t?t.split("|"):[]}return t},getRGB:function(e){return e[3]?"rgba("+e.join(",")+")":"rgb("+e.slice(0,-1).join(",")+")"}},d={parse:a,fetch:o,version:"0.2.5"};"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=d),exports.gexf=d):"function"==typeof define&&define.amd?define("gexf",[],function(){return d}):"undefined"!=typeof this.gexf?(this.gexf.parse=a,this.gexf.fetch=o):this.gexf=d}).call(this),function(e){"use strict";function t(e,t){switch(e){case"boolean":case"integer":case"long":case"float":case"double":return""+t;case"liststring":if(t instanceof Array)return t.join("|")}if("object"==typeof t)throw Error("gexf.writer.cast: trying to cast an object to a string.");return t}function i(e){var t=[0,0,0];return e.match(/^#/)?(e=(e||"").replace(/^#/,""),t=3===e.length?[parseInt(e.charAt(0)+e.charAt(0),16),parseInt(e.charAt(1)+e.charAt(1),16),parseInt(e.charAt(2)+e.charAt(2),16)]:[parseInt(e.charAt(0)+e.charAt(1),16),parseInt(e.charAt(2)+e.charAt(3),16),parseInt(e.charAt(4)+e.charAt(5),16)]):e.match(/^ *rgba? *\(/)&&(e=e.match(/^ *rgba? *\( *([0-9]*) *, *([0-9]*) *, *([0-9]*) *(,.*)?\) *$/),t=[+e[1],+e[2],+e[3]],e[4]&&t.push(+e[4].replace(", ",""))),t}function r(t){t=t||{};var i=t.implementation||e.implementation;this.serializer=t.serializer?new t.serializer:new XMLSerializer,this.document=i.createDocument("http://www.gexf.net/1.2draft","gexf",null),this.root=this.document.documentElement,this.xmlns=t.namespace||"http://www.gexf.net/1.2draft",this.vizXmlns=t.vizNamespace||"http:///www.gexf.net/1.2draft/viz",this.root.setAttribute("xmlns",this.xmlns),this.root.setAttribute("xmlns:xsi","http://www.w3.org/2001/XMLSchema-instance"),this.root.setAttribute("xsi:schemaLocation","http://www.gexf.net/1.2draft http://www.gexf.net/1.2draft/gexf.xsd"),this.hasViz=!1,this.root.setAttribute("version",t.version||"1.2"),this.encoding=t.encoding||"UTF-8",t.meta&&this.setMeta(t.meta),this.graph=this.createElement("graph",{defaultedgetype:t.defaultEdgeType||"undirected",mode:t.mode}),this.root.appendChild(this.graph),this.model={node:{},edge:{}},this.nodeAttributes=null,this.edgeAttributes=null,t.model&&t.model.node&&this.setNodeModel(t.model.node),t.model&&t.model.edge&&this.setEdgeModel(t.model.edge),this.nodes=this.createElement("nodes"),this.edges=this.createElement("edges"),this.graph.appendChild(this.nodes),this.graph.appendChild(this.edges);var r,n;if(t.nodes)for(r=0,n=t.nodes.length;n>r;r++)this.addNode(t.nodes[r]);if(t.edges)for(r=0,n=t.edges.length;n>r;r++)this.addEdge(t.edges[r])}function n(e){return new r(e)}var a=["integer","long","double","float","boolean","liststring","string","anyURI"];r.prototype.createElement=function(e,t,i){if(!e)throw Error("gexf.writer.createElement: wrong arguments.");"object"==typeof t&&(i=t,t=null);var r=this.document.createElement(e);if(t){var n=this.document.createTextNode(t);r.appendChild(n)}if(i)for(var a in i)"undefined"!=typeof i[a]&&null!==i[a]&&r.setAttribute(a,i[a]);return r},r.prototype.setMeta=function(e){e=e||{};var t,i=this.document.createElement("meta");for(t in e)"lastmodifieddate"===t?i.setAttribute("lastmodifieddate",e[t]):i.appendChild(this.createElement(t,e[t]));return this.root.appendChild(i),this},r.prototype.setModel=function(e,t){if(t=t||[],"node"!==e&&"edge"!==e)throw Error('gexf.writer.setModel: wrong model cls "'+e+'"');if(!(t instanceof Array))throw Error("gexf.writer.setModel: model is not a valid array.");this.model[e]={};var i=this.createElement("attributes",{"class":e}),r=e+"Attributes";this[r]&&this.graph.removeChild(this[r]),this[r]=i,this.graph.insertBefore(i,this.nodes||this.edges);var n,a;for(n=0,a=t.length;a>n;n++)this.addAttribute(e,t[n]);return this},r.prototype.setNodeModel=function(e){return this.setModel("node",e)},r.prototype.setEdgeModel=function(e){return this.setModel("edge",e)},r.prototype.addAttribute=function(e,t){if("node"!==e&&"edge"!==e)throw Error('gexf.writer.addAttribute: wrong model cls "'+e+'"');if(!t)throw Error("gexf.writer.addAttribute: wrong arguments.");if(!this[e+"Attributes"])return this.setModel(e,[t]);var i=t.type||"string";if(!~a.indexOf(i))throw Error('gexf.writer.addAttribute: unknown attribute type "'+i+'"');this.model[e][t.id]=t;var r=this.createElement("attribute",{id:t.id,title:t.title,type:i});if("undefined"!=typeof t.defaultValue){var n=this.createElement("default",t.defaultValue);r.appendChild(n)}return this[e+"Attributes"].appendChild(r),this},r.prototype.addNodeAttribute=function(e){return this.addAttribute("node",e)},r.prototype.addEdgeAttribute=function(e){return this.addAttribute("edge",e)},r.prototype.addNode=function(e){var r,n,a;if("undefined"==typeof e.id||null===e.id)throw Error("gexf.writer.addNode: inexistent id.");var o=this.createElement("node",{id:e.id,label:e.label});if(e.attributes&&Object.keys(e.attributes).length>0){var s=this.createElement("attvalues");for(r in e.attributes||{}){if(n=e.attributes[r],a=this.model.node[r],!a)throw Error('gexf.writer.addNode: property "'+r+'" not registered in node model.');var d=this.createElement("attvalue",{"for":a.id,value:t(a.type,n)});s.appendChild(d)}o.appendChild(s)}if(e.viz){if(this.hasViz||(this.hasViz=!0,this.root.setAttribute("xmlns:viz",this.vizXmlns)),e.viz.color){var l=i(e.viz.color),u=this.createElement("viz:color",{r:l[0],g:l[1],b:l[2],a:l[3]});o.appendChild(u)}if(e.viz.position){var h=this.createElement("viz:position",{x:e.viz.position.x,y:e.viz.position.y,z:e.viz.position.z});o.appendChild(h)}if(e.viz.size){var c=this.createElement("viz:size",{value:e.viz.size});o.appendChild(c)}if(e.viz.shape){var f=this.createElement("viz:shape",{value:e.viz.shape});o.appendChild(f)}}return this.nodes.appendChild(o),this},r.prototype.addEdge=function(e){var r,n,a,o=this.createElement("edge",{id:e.id,label:e.label,weight:e.weight,type:e.type,source:e.source,target:e.target});if(e.attributes&&Object.keys(e.attributes).length>0){var s=this.createElement("attvalues");for(r in e.attributes||{}){if(n=e.attributes[r],a=this.model.edge[r],!a)throw Error('gexf.writer.addEdge: property "'+r+'" not registered in edge model.');var d=this.createElement("attvalue",{"for":a.id,value:t(a.type,n)});s.appendChild(d)}o.appendChild(s)}if(e.viz){if(this.hasViz||(this.hasViz=!0,this.root.setAttribute("xmlns:viz",this.vizXmlns)),e.viz.color){var l=i(e.viz.color),u=this.createElement("viz:color",{r:l[0],g:l[1],b:l[2],a:l[3]});o.appendChild(u)}if(e.viz.shape){var h=this.createElement("viz:shape",{value:e.viz.shape});o.appendChild(h)}if(e.viz.thickness){var c=this.createElement("viz:thickness",{value:e.viz.thickness});o.appendChild(c)}}return this.edges.appendChild(o),this},r.prototype.serialize=function(){return'<?xml version="1.0" encoding="'+this.encoding+'"?>'+this.serializer.serializeToString(this.document)};var o={create:n,version:"0.2.5"};"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=o),exports.gexf=o):"function"==typeof define&&define.amd?define("gexf",[],function(){return o}):"undefined"!=typeof this.gexf?this.gexf.create=n:this.gexf=o}.call(this,"document"in this?this.document:{});