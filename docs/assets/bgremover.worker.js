/*!
 * ONNX Runtime Web v1.31.1
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */var Kn=Object.defineProperty,d0=Object.getOwnPropertyDescriptor,p0=Object.getOwnPropertyNames,c0=Object.prototype.hasOwnProperty,f0=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(t,r)=>(typeof require<"u"?require:t)[r]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')}),D=(e,t,r)=>()=>{if(r)throw r[0];try{return e&&(t=e(e=0)),t}catch(i){throw r=[i],i}},Zt=(e,t)=>{for(var r in t)Kn(e,r,{get:t[r],enumerable:!0})},h0=(e,t,r,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of p0(t))!c0.call(e,n)&&n!==r&&Kn(e,n,{get:()=>t[n],enumerable:!(i=d0(t,n))||i.enumerable});return e},yr=e=>h0(Kn({},"__esModule",{value:!0}),e),Wt,st,Ei,Ht,Ci,up,lp,Zn=D(()=>{"use strict";Wt=new Map,st=[],Ei=new WeakMap,Ht=(e,t,r)=>{if(t&&typeof t.init=="function"&&typeof t.createInferenceSessionHandler=="function"){let i=Wt.get(e);if(i===void 0)Wt.set(e,{backend:t,priority:r});else{if(i.priority>r)return;if(i.priority===r&&i.backend!==t)throw new Error(`cannot register backend "${e}" using priority ${r}`)}if(r>=0){let n=st.indexOf(e);n!==-1&&st.splice(n,1);for(let a=0;a<st.length;a++)if(Wt.get(st[a]).priority<=r){st.splice(a,0,e);return}st.push(e)}return}throw new TypeError("not a valid backend")},Ci=async e=>{let t=Wt.get(e);if(!t)return"backend not found.";if(t.initialized)return t.backend;if(t.aborted)return t.error;{let r=!!t.initPromise;try{if(!r){let i=t.backend,n=Ei.get(i);t.initPromise=n?n.then(async()=>i.init(e),async()=>i.init(e)):i.init(e),Ei.set(i,t.initPromise)}return await t.initPromise,t.initialized=!0,t.backend}catch(i){return r||(t.error=`${i}`,t.aborted=!0),t.error}finally{delete t.initPromise}}},up=async e=>{let t=e.executionProviders||[],r=t.map(l=>typeof l=="string"?l:l.name),i=r.length===0?st:r,n,a=[],s=new Set;for(let l of i){let p=await Ci(l);typeof p=="string"?a.push({name:l,err:p}):(n||(n=p),n===p&&s.add(l))}if(!n)throw new Error(`no available backend found. ERR: ${a.map(l=>`[${l.name}] ${l.err}`).join(", ")}`);for(let{name:l,err:p}of a)r.includes(l)&&console.warn(`removing requested execution provider "${l}" from session options because it is not available: ${p}`);let u=t.filter(l=>s.has(typeof l=="string"?l:l.name));return[n,new Proxy(e,{get:(l,p)=>p==="executionProviders"?u:Reflect.get(l,p)})]},lp=async()=>{let e=[];for(let r of st){if(typeof Wt.get(r).backend.createLoraAdapterHandler!="function")continue;let i=await Ci(r);if(typeof i!="string")return i;e.push({name:r,err:i})}let t=e.length===0?"":` ERR: ${e.map(r=>`[${r.name}] ${r.err}`).join(", ")}`;throw new Error(`no available backend supports LoRA adapters.${t}`)}}),m0=D(()=>{"use strict";Zn()}),dp,g0=D(()=>{"use strict";dp="1.31.1"}),zi,Oe,pp=D(()=>{"use strict";g0(),zi="warning",Oe={wasm:{},webgl:{},webgpu:{},versions:{common:dp},set logLevel(e){if(e!==void 0){if(typeof e!="string"||["verbose","info","warning","error","fatal"].indexOf(e)===-1)throw new Error(`Unsupported logging level: ${e}`);zi=e}},get logLevel(){return zi}},Object.defineProperty(Oe,"logLevel",{enumerable:!0})}),_e,y0=D(()=>{"use strict";pp(),_e=Oe}),Kr,Ai,We,De,Rt,Bt,Qn=D(()=>{"use strict";pp(),Kr=(e,t)=>{(typeof Oe.trace>"u"?!Oe.wasm.trace:!Oe.trace)||console.timeStamp(`${e}::ORT::${t}`)},Ai=(e,t)=>{let r=new Error().stack?.split(/\r\n|\r|\n/g)||[],i=!1;for(let n=0;n<r.length;n++){if(i&&!r[n].includes("TRACE_FUNC")){let a=`FUNC_${e}::${r[n].trim().split(" ")[1]}`;t&&(a+=`::${t}`),Kr("CPU",a);return}r[n].includes("TRACE_FUNC")&&(i=!0)}},We=e=>{(typeof Oe.trace>"u"?!Oe.wasm.trace:!Oe.trace)||Ai("BEGIN",e)},De=e=>{(typeof Oe.trace>"u"?!Oe.wasm.trace:!Oe.trace)||Ai("END",e)},Rt=e=>{(typeof Oe.trace>"u"?!Oe.wasm.trace:!Oe.trace)||console.time(`ORT::${e}`)},Bt=e=>{(typeof Oe.trace>"u"?!Oe.wasm.trace:!Oe.trace)||console.timeEnd(`ORT::${e}`)}}),Xn,cp=D(()=>{"use strict";Zn(),Qn(),Xn=class fp{constructor(t,r){this.backend=t,this.handler=r}static async create(t){if(We(),typeof t!="string"&&!(t instanceof Uint8Array))throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let r=await lp(),i=await r.createLoraAdapterHandler(t);return De(),new fp(r,i)}async release(){return this.handler.dispose()}}}),hp,mp,_0=D(()=>{"use strict";hp=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);r.width=e.dims[3],r.height=e.dims[2];let i=r.getContext("2d");if(i!=null){let n,a;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(n=e.dims[2],a=e.dims[3]):(n=e.dims[3],a=e.dims[2]);let s=t?.format!==void 0?t.format:"RGB",u=t?.norm,l,p;u===void 0||u.mean===void 0?l=[255,255,255,255]:typeof u.mean=="number"?l=[u.mean,u.mean,u.mean,u.mean]:(l=[u.mean[0],u.mean[1],u.mean[2],0],u.mean[3]!==void 0&&(l[3]=u.mean[3])),u===void 0||u.bias===void 0?p=[0,0,0,0]:typeof u.bias=="number"?p=[u.bias,u.bias,u.bias,u.bias]:(p=[u.bias[0],u.bias[1],u.bias[2],0],u.bias[3]!==void 0&&(p[3]=u.bias[3]));let c=a*n,h=0,g=c,_=c*2,y=-1;s==="RGBA"?(h=0,g=c,_=c*2,y=c*3):s==="RGB"?(h=0,g=c,_=c*2):s==="RBG"&&(h=0,_=c,g=c*2);for(let v=0;v<a;v++)for(let S=0;S<n;S++){let $=(e.data[h++]-p[0])*l[0],w=(e.data[g++]-p[1])*l[1],T=(e.data[_++]-p[2])*l[2],k=y===-1?255:(e.data[y++]-p[3])*l[3];i.fillStyle="rgba("+$+","+w+","+T+","+k+")",i.fillRect(S,v,1,1)}if("toDataURL"in r)return r.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},mp=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),i;if(r!=null){let n,a,s;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(n=e.dims[2],a=e.dims[1],s=e.dims[3]):(n=e.dims[3],a=e.dims[2],s=e.dims[1]);let u=t!==void 0&&t.format!==void 0?t.format:"RGB",l=t?.norm,p,c;l===void 0||l.mean===void 0?p=[255,255,255,255]:typeof l.mean=="number"?p=[l.mean,l.mean,l.mean,l.mean]:(p=[l.mean[0],l.mean[1],l.mean[2],255],l.mean[3]!==void 0&&(p[3]=l.mean[3])),l===void 0||l.bias===void 0?c=[0,0,0,0]:typeof l.bias=="number"?c=[l.bias,l.bias,l.bias,l.bias]:(c=[l.bias[0],l.bias[1],l.bias[2],0],l.bias[3]!==void 0&&(c[3]=l.bias[3]));let h=a*n;if(t!==void 0&&(t.format!==void 0&&s===4&&t.format!=="RGBA"||s===3&&t.format!=="RGB"&&t.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");let g=4,_=0,y=1,v=2,S=3,$=0,w=h,T=h*2,k=-1;u==="RGBA"?($=0,w=h,T=h*2,k=h*3):u==="RGB"?($=0,w=h,T=h*2):u==="RBG"&&($=0,T=h,w=h*2),i=r.createImageData(n,a);for(let I=0;I<a*n;_+=g,y+=g,v+=g,S+=g,I++)i.data[_]=(e.data[$++]-c[0])*p[0],i.data[y]=(e.data[w++]-c[1])*p[1],i.data[v]=(e.data[T++]-c[2])*p[2],i.data[S]=k===-1?255:(e.data[k++]-c[3])*p[3]}else throw new Error("Can not access image data");return i}}),Ar,gp,yp,_p,wp,$p,w0=D(()=>{"use strict";Yn(),Ar=(e,t)=>{if(e===void 0)throw new Error("Image buffer must be defined");if(t.height===void 0||t.width===void 0)throw new Error("Image height and width must be defined");if(t.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");let{height:r,width:i}=t,n=t.norm??{mean:255,bias:0},a,s;typeof n.mean=="number"?a=[n.mean,n.mean,n.mean,n.mean]:a=[n.mean[0],n.mean[1],n.mean[2],n.mean[3]??255],typeof n.bias=="number"?s=[n.bias,n.bias,n.bias,n.bias]:s=[n.bias[0],n.bias[1],n.bias[2],n.bias[3]??0];let u=t.format!==void 0?t.format:"RGBA",l=t.tensorFormat!==void 0&&t.tensorFormat!==void 0?t.tensorFormat:"RGB",p=r*i,c=l==="RGBA"?new Float32Array(p*4):new Float32Array(p*3),h=4,g=0,_=1,y=2,v=3,S=0,$=p,w=p*2,T=-1;u==="RGB"&&(h=3,g=0,_=1,y=2,v=-1),l==="RGBA"?T=p*3:l==="RBG"?(S=0,w=p,$=p*2):l==="BGR"&&(w=0,$=p,S=p*2);for(let k=0;k<p;k++,g+=h,y+=h,_+=h,v+=h)c[S++]=(e[g]+s[0])/a[0],c[$++]=(e[_]+s[1])/a[1],c[w++]=(e[y]+s[2])/a[2],T!==-1&&v!==-1&&(c[T++]=(e[v]+s[3])/a[3]);return l==="RGBA"?new Ne("float32",c,[1,4,r,i]):new Ne("float32",c,[1,3,r,i])},gp=async(e,t)=>{let r=typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement,i=typeof ImageData<"u"&&e instanceof ImageData,n=typeof ImageBitmap<"u"&&e instanceof ImageBitmap,a=typeof e=="string",s,u=t??{},l=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},p=c=>typeof HTMLCanvasElement<"u"&&c instanceof HTMLCanvasElement||c instanceof OffscreenCanvas?c.getContext("2d"):null;if(r){let c=l();c.width=e.width,c.height=e.height;let h=p(c);if(h!=null){let g=e.height,_=e.width;if(t!==void 0&&t.resizedHeight!==void 0&&t.resizedWidth!==void 0&&(g=t.resizedHeight,_=t.resizedWidth),t!==void 0){if(u=t,t.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");u.tensorFormat="RGBA",u.height=g,u.width=_}else u.tensorFormat="RGBA",u.height=g,u.width=_;h.drawImage(e,0,0),s=h.getImageData(0,0,_,g).data}else throw new Error("Can not access image data")}else if(i){let c,h;if(t!==void 0&&t.resizedWidth!==void 0&&t.resizedHeight!==void 0?(c=t.resizedHeight,h=t.resizedWidth):(c=e.height,h=e.width),t!==void 0&&(u=t),u.format="RGBA",u.height=c,u.width=h,t!==void 0){let g=l();g.width=h,g.height=c;let _=p(g);if(_!=null)_.putImageData(e,0,0),s=_.getImageData(0,0,h,c).data;else throw new Error("Can not access image data")}else s=e.data}else if(n){if(t===void 0)throw new Error("Please provide image config with format for Imagebitmap");let c=l();c.width=e.width,c.height=e.height;let h=p(c);if(h!=null){let g=e.height,_=e.width;return h.drawImage(e,0,0,_,g),s=h.getImageData(0,0,_,g).data,u.height=g,u.width=_,Ar(s,u)}else throw new Error("Can not access image data")}else{if(a)return new Promise((c,h)=>{let g=l(),_=p(g);if(!e||!_)return h();let y=new Image;y.crossOrigin="Anonymous",y.src=e,y.onload=()=>{g.width=y.width,g.height=y.height,_.drawImage(y,0,0,g.width,g.height);let v=_.getImageData(0,0,g.width,g.height);u.height=g.height,u.width=g.width,c(Ar(v.data,u))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(s!==void 0)return Ar(s,u);throw new Error("Input data provided is not supported - aborted tensor creation")},yp=(e,t)=>{let{width:r,height:i,download:n,dispose:a}=t,s=[1,i,r,4];return new Ne({location:"texture",type:"float32",texture:e,dims:s,download:n,dispose:a})},_p=(e,t)=>{let{dataType:r,dims:i,download:n,dispose:a}=t;return new Ne({location:"gpu-buffer",type:r??"float32",gpuBuffer:e,dims:i,download:n,dispose:a})},wp=(e,t)=>{let{dataType:r,dims:i,download:n,dispose:a}=t;return new Ne({location:"ml-tensor",type:r??"float32",mlTensor:e,dims:i,download:n,dispose:a})},$p=(e,t,r)=>new Ne({location:"cpu-pinned",type:e,data:t,dims:r??[t.length]})}),zt,fr,Oi,bp,$0=D(()=>{"use strict";zt=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),fr=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),Oi=!1,bp=()=>{if(!Oi){Oi=!0;let e=typeof BigInt64Array<"u"&&BigInt64Array.from,t=typeof BigUint64Array<"u"&&BigUint64Array.from,r=globalThis.Float16Array,i=typeof r<"u"&&r.from;e&&(zt.set("int64",BigInt64Array),fr.set(BigInt64Array,"int64")),t&&(zt.set("uint64",BigUint64Array),fr.set(BigUint64Array,"uint64")),i?(zt.set("float16",r),fr.set(r,"float16")):zt.set("float16",Uint16Array)}}}),vp,xp,b0=D(()=>{"use strict";Yn(),vp=e=>{let t=1;for(let r=0;r<e.length;r++){let i=e[r];if(typeof i!="number"||!Number.isSafeInteger(i))throw new TypeError(`dims[${r}] must be an integer, got: ${i}`);if(i<0)throw new RangeError(`dims[${r}] must be a non-negative integer, got: ${i}`);t*=i}return t},xp=(e,t)=>{switch(e.location){case"cpu":return new Ne(e.type,e.data,t);case"cpu-pinned":return new Ne({location:"cpu-pinned",data:e.data,type:e.type,dims:t});case"texture":return new Ne({location:"texture",texture:e.texture,type:e.type,dims:t});case"gpu-buffer":return new Ne({location:"gpu-buffer",gpuBuffer:e.gpuBuffer,type:e.type,dims:t});case"ml-tensor":return new Ne({location:"ml-tensor",mlTensor:e.mlTensor,type:e.type,dims:t});default:throw new Error(`tensorReshape: tensor location ${e.location} is not supported`)}}}),Ne,Yn=D(()=>{"use strict";_0(),w0(),$0(),b0(),Ne=class{constructor(e,t,r){bp();let i,n;if(typeof e=="object"&&"location"in e)switch(this.dataLocation=e.location,i=e.type,n=e.dims,e.location){case"cpu-pinned":{let s=zt.get(i);if(!s)throw new TypeError(`unsupported type "${i}" to create tensor from pinned buffer`);if(!(e.data instanceof s))throw new TypeError(`buffer should be of type ${s.name}`);this.cpuData=e.data;break}case"texture":{if(i!=="float32")throw new TypeError(`unsupported type "${i}" to create tensor from texture`);this.gpuTextureData=e.texture,this.downloader=e.download,this.disposer=e.dispose;break}case"gpu-buffer":{if(i!=="float32"&&i!=="float16"&&i!=="int32"&&i!=="int64"&&i!=="uint32"&&i!=="uint8"&&i!=="bool"&&i!=="uint4"&&i!=="int4")throw new TypeError(`unsupported type "${i}" to create tensor from gpu buffer`);this.gpuBufferData=e.gpuBuffer,this.downloader=e.download,this.disposer=e.dispose;break}case"ml-tensor":{if(i!=="float32"&&i!=="float16"&&i!=="int32"&&i!=="int64"&&i!=="uint32"&&i!=="uint64"&&i!=="int8"&&i!=="uint8"&&i!=="bool"&&i!=="uint4"&&i!=="int4")throw new TypeError(`unsupported type "${i}" to create tensor from MLTensor`);this.mlTensorData=e.mlTensor,this.downloader=e.download,this.disposer=e.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let s,u;if(typeof e=="string")if(i=e,u=r,e==="string"){if(!Array.isArray(t))throw new TypeError("A string tensor's data must be a string array.");s=t}else{let l=zt.get(e);if(l===void 0)throw new TypeError(`Unsupported tensor type: ${e}.`);if(Array.isArray(t)){if(e==="float16"&&l===Uint16Array||e==="uint4"||e==="int4")throw new TypeError(`Creating a ${e} tensor from number array is not supported. Please use ${l.name} as data.`);e==="uint64"||e==="int64"?s=l.from(t,BigInt):s=l.from(t)}else if(t instanceof l)s=t;else if(t instanceof Uint8ClampedArray)if(e==="uint8")s=Uint8Array.from(t);else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else if(e==="float16"&&t instanceof Uint16Array&&l!==Uint16Array)s=new globalThis.Float16Array(t.buffer,t.byteOffset,t.length);else throw new TypeError(`A ${i} tensor's data must be type of ${l}`)}else if(u=t,Array.isArray(e)){if(e.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");let l=typeof e[0];if(l==="string")i="string",s=e;else if(l==="boolean")i="bool",s=Uint8Array.from(e);else throw new TypeError(`Invalid element type of data array: ${l}.`)}else if(e instanceof Uint8ClampedArray)i="uint8",s=Uint8Array.from(e);else{let l=fr.get(e.constructor);if(l===void 0)throw new TypeError(`Unsupported type for tensor data: ${e.constructor}.`);i=l,s=e}if(u===void 0)u=[s.length];else if(!Array.isArray(u))throw new TypeError("A tensor's dims must be a number array");n=u,this.cpuData=s,this.dataLocation="cpu"}let a=vp(n);if(this.cpuData&&a!==this.cpuData.length&&!((i==="uint4"||i==="int4")&&Math.ceil(a/2)===this.cpuData.length))throw new Error(`Tensor's size(${a}) does not match data length(${this.cpuData.length}).`);this.type=i,this.dims=n,this.size=a}static async fromImage(e,t){return gp(e,t)}static fromTexture(e,t){return yp(e,t)}static fromGpuBuffer(e,t){return _p(e,t)}static fromMLTensor(e,t){return wp(e,t)}static fromPinnedBuffer(e,t,r){return $p(e,t,r)}toDataURL(e){return hp(this,e)}toImageData(e){return mp(this,e)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw new Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(e){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let t=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=t,e&&this.disposer&&(this.disposer(),this.disposer=void 0),t}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(e){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return xp(this,e)}}}),Xe,Sp=D(()=>{"use strict";Yn(),Xe=Ne}),kp,v0=D(()=>{"use strict";Zn(),cp(),Sp(),Qn(),kp=class Tp{constructor(t,r){this.handler=t,this.backend=r}async run(t,r,i){We(),Rt("InferenceSession.run");let n={},a={};if(typeof t!="object"||t===null||t instanceof Xe||Array.isArray(t))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let s=!0;if(typeof r=="object"){if(r===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(r instanceof Xe)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(r)){if(r.length===0)throw new TypeError("'fetches' cannot be an empty array.");s=!1;for(let c of r){if(typeof c!="string")throw new TypeError("'fetches' must be a string array or an object.");if(this.outputNames.indexOf(c)===-1)throw new RangeError(`'fetches' contains invalid output name: ${c}.`);n[c]=null}if(typeof i=="object"&&i!==null)a=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else{let c=!1,h=Object.getOwnPropertyNames(r);for(let g of this.outputNames)if(h.indexOf(g)!==-1){let _=r[g];(_===null||_ instanceof Xe)&&(c=!0,s=!1,n[g]=_)}if(c){if(typeof i=="object"&&i!==null)a=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else a=r}}else if(typeof r<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let c of this.inputNames)if(typeof t[c]>"u")throw new Error(`input '${c}' is missing in 'feeds'.`);if(s)for(let c of this.outputNames)n[c]=null;let u;if(a.activeLoraAdapters!==void 0){if(!Array.isArray(a.activeLoraAdapters))throw new TypeError("'activeLoraAdapters' must be an array.");u=a.activeLoraAdapters.map(c=>{if(!(c instanceof Xn))throw new TypeError("'activeLoraAdapters' must be an array of LoraAdapter objects.");if(c.backend!==this.backend)throw new Error("LoRA adapter was created by a different backend than the session.");return c.handler})}let l=await this.handler.run(t,n,a,u),p={};for(let c in l)if(Object.hasOwnProperty.call(l,c)){let h=l[c];h instanceof Xe?p[c]=h:p[c]=new Xe(h.type,h.data,h.dims)}return Bt("InferenceSession.run"),De(),p}async release(){return this.handler.dispose()}static async create(t,r,i,n){We(),Rt("InferenceSession.create");let a,s={};if(typeof t=="string"){if(a=t,typeof r=="object"&&r!==null)s=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof Uint8Array){if(a=t,typeof r=="object"&&r!==null)s=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&t instanceof SharedArrayBuffer){let c=t,h=0,g=t.byteLength;if(typeof r=="object"&&r!==null)s=r;else if(typeof r=="number"){if(h=r,!Number.isSafeInteger(h))throw new RangeError("'byteOffset' must be an integer.");if(h<0||h>=c.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${c.byteLength}).`);if(g=t.byteLength-h,typeof i=="number"){if(g=i,!Number.isSafeInteger(g))throw new RangeError("'byteLength' must be an integer.");if(g<=0||h+g>c.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${c.byteLength-h}].`);if(typeof n=="object"&&n!==null)s=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else if(typeof i<"u")throw new TypeError("'byteLength' must be a number.")}else if(typeof r<"u")throw new TypeError("'options' must be an object.");a=new Uint8Array(c,h,g)}else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[u,l]=await up(s),p=await u.createInferenceSessionHandler(a,l);return Bt("InferenceSession.create"),De(),new Tp(p,u)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}get inputMetadata(){return this.handler.inputMetadata}get outputMetadata(){return this.handler.outputMetadata}}}),Zr,x0=D(()=>{"use strict";v0(),Zr=kp}),Ip,S0=D(()=>{"use strict";cp(),Ip=Xn}),k0=D(()=>{"use strict"}),T0=D(()=>{"use strict"}),I0=D(()=>{"use strict"}),E0=D(()=>{"use strict"}),C0={};Zt(C0,{InferenceSession:()=>Zr,LoraAdapter:()=>Ip,TRACE:()=>Kr,TRACE_EVENT_BEGIN:()=>Rt,TRACE_EVENT_END:()=>Bt,TRACE_FUNC_BEGIN:()=>We,TRACE_FUNC_END:()=>De,Tensor:()=>Xe,env:()=>_e,registerBackend:()=>Ht});var Pe=D(()=>{"use strict";m0(),y0(),x0(),S0(),Sp(),k0(),T0(),Qn(),I0(),E0()}),Jn=D(()=>{"use strict"}),Ep={};Zt(Ep,{default:()=>Cp});var Ri,Bi,Cp,z0=D(()=>{"use strict";Ph(),Ut(),ea(),Ri="ort-wasm-proxy-worker",Bi=globalThis.self?.name===Ri,Bi&&(self.onmessage=e=>{let{type:t,in:r}=e.data;try{switch(t){case"init-wasm":ta(r.wasm).then(()=>{_a(r).then(()=>{postMessage({type:t})},i=>{postMessage({type:t,err:i})})},i=>{postMessage({type:t,err:i})});break;case"init-ep":{let{epName:i,env:n}=r;wa(n,i).then(()=>{postMessage({type:t})},a=>{postMessage({type:t,err:a})});break}case"copy-from":{let{buffer:i}=r,n=ri(i);postMessage({type:t,out:n});break}case"create":{let{model:i,options:n}=r;$a(i,n).then(a=>{postMessage({type:t,out:a})},a=>{postMessage({type:t,err:a})});break}case"release":ba(r),postMessage({type:t});break;case"run":{let{sessionId:i,inputIndices:n,inputs:a,outputIndices:s,options:u}=r;va(i,n,a,s,new Array(s.length).fill(null),u).then(l=>{l.some(p=>p[3]!=="cpu")?postMessage({type:t,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:t,out:l},Sa([...a,...l]))},l=>{postMessage({type:t,err:l})});break}case"end-profiling":xa(r),postMessage({type:t});break;default:}}catch(i){postMessage({type:t,err:i})}}),Cp=Bi?null:e=>new Worker(e??Me,{type:"module",name:Ri})}),zp={};Zt(zp,{default:()=>Ap});async function xo(e={}){var t=e,r=!!globalThis.window,i=!!globalThis.WorkerGlobalScope,n=i&&self.name?.startsWith("em-pthread");t.mountExternalData=(o,d)=>{o.startsWith("./")&&(o=o.substring(2)),(t.jd||(t.jd=new Map)).set(o,d)},t.unmountExternalData=()=>{delete t.jd,delete t.ke,delete t.je,delete t.le},globalThis.SharedArrayBuffer??new WebAssembly.Memory({initial:0,maximum:0,shared:!0}).buffer.constructor;let a=o=>async(...d)=>{try{if(t.hd)throw Error("Session already started");let m=t.hd={Vd:d[0],errors:[]},f=await o(...d);if(t.hd!==m)throw Error("Session mismatch");t.pd?.flush();let b=m.errors;if(0<b.length){let E=await Promise.all(b);if(E=E.filter(z=>z),0<E.length)throw Error(E.join(`
`))}return f}finally{t.hd=null}};t.jsepInit=(o,d)=>{if(o==="webgpu"){[t.pd,t.Ld,t.Pd,t.rd,t.Od,t.ic,t.Qd,t.Sd,t.Md,t.Nd,t.Rd]=d;let m=t.pd;t.jsepRegisterBuffer=(f,b,E,z)=>m.registerBuffer(f,b,E,z),t.jsepGetBuffer=f=>m.getBuffer(f),t.jsepCreateDownloader=(f,b,E)=>m.createDownloader(f,b,E),t.jsepOnCreateSession=f=>{m.onCreateSession(f)},t.jsepOnReleaseSession=f=>{m.onReleaseSession(f)},t.jsepOnRunStart=f=>m.onRunStart(f),t.Td=(f,b)=>{m.upload(f,b)}}else if(o==="webnn"){let m=d[0];[t.ce,t.Cd,t.webnnEnsureTensor,t.Dd,t.webnnDownloadTensor,t.be,t.webnnEnableTraceEvent]=d.slice(1),t.webnnReleaseTensorId=t.Cd,t.webnnUploadTensor=t.Dd,t.webnnRegisterMLContext=t.be,t.webnnOnRunStart=f=>m.onRunStart(f),t.webnnOnRunEnd=m.onRunEnd.bind(m),t.webnnOnReleaseSession=f=>{m.onReleaseSession(f)},t.webnnCreateMLTensorDownloader=(f,b)=>m.createMLTensorDownloader(f,b),t.webnnRegisterMLTensor=(f,b,E,z)=>m.registerMLTensor(f,b,E,z),t.webnnCreateMLContext=f=>m.createMLContext(f),t.webnnRegisterGraphInput=m.registerGraphInput.bind(m),t.webnnIsGraphInput=m.isGraphInput.bind(m),t.webnnRegisterGraphOutput=m.registerGraphOutput.bind(m),t.webnnIsGraphOutput=m.isGraphOutput.bind(m),t.webnnCreateTemporaryTensor=m.createTemporaryTensor.bind(m),t.webnnIsGraphInputOutputTypeSupported=m.isGraphInputOutputTypeSupported.bind(m)}};let s=()=>{let o=d=>(...m)=>{let f=et;return m=d(...m),et!=f?new Promise((b,E)=>{mi={resolve:b,reject:E}}):m};(d=>{for(let m of d)t[m]=o(t[m])})("_OrtAppendExecutionProvider _OrtAppendExecutionProviderV2 _OrtCreateSession _OrtRun _OrtRunWithBinding _OrtBindInput".split(" ")),a!==void 0&&(t._OrtRun=a(t._OrtRun),t._OrtRunWithBinding=a(t._OrtRunWithBinding)),s=void 0};t.asyncInit=()=>{s?.()};var u,l,p=(o,d)=>{throw d},c=import.meta.url,h="";if(r||i){try{h=new URL(".",c).href}catch{}i&&(l=o=>{var d=new XMLHttpRequest;return d.open("GET",o,!1),d.responseType="arraybuffer",d.send(null),new Uint8Array(d.response)}),u=async o=>{if(A(o))return new Promise((m,f)=>{var b=new XMLHttpRequest;b.open("GET",o,!0),b.responseType="arraybuffer",b.onload=()=>{b.status==200||b.status==0&&b.response?m(b.response):f(b.status)},b.onerror=f,b.send(null)});var d=await fetch(o,{credentials:"same-origin"});if(d.ok)return d.arrayBuffer();throw Error(d.status+" : "+d.url)}}var g,_,y,v,S,$,w=console.log.bind(console),T=console.error.bind(console),k=w,I=T,C=!1,A=o=>o.startsWith("file://");function x(){ct.buffer!=L.buffer&&H()}if(n){let o=function(d){try{var m=d.data,f=m.bd;if(f==="load"){let b=[];self.onmessage=E=>b.push(E),$=()=>{postMessage({bd:"loaded"});for(let E of b)o(E);self.onmessage=o};for(let E of m.Hd)t[E]&&!t[E].proxy||(t[E]=(...z)=>{postMessage({bd:"callHandler",Fd:E,args:z})},E=="print"&&(k=t[E]),E=="printErr"&&(I=t[E]));ct=m.Zd,H(),_=m.$d,Ve(),zr()}else if(f==="run"){(function(b){var E=(x(),W)[b+52>>>2>>>0];b=(x(),W)[b+56>>>2>>>0],zs(E,E-b),oe(E)})(m.ad),$i(m.ad,0,0,1,0,0),za(),ci(m.ad),N||(Ss(),N=!0);try{em(m.Xd,m.nd)}catch(b){if(b!="unwind")throw b}}else m.target!=="setimmediate"&&(f==="checkMailbox"?N&&xr():f&&(I(`worker: received unknown command ${f}`),I(m)))}catch(b){throw ks(),b}};var N=!1;self.onunhandledrejection=d=>{throw d.reason||d},self.onmessage=o}var L,X,Q,J,O,W,Y,P,se,ne,te,U=!1;function H(){var o=ct.buffer;t.HEAP8=L=new Int8Array(o),Q=new Int16Array(o),t.HEAPU8=X=new Uint8Array(o),J=new Uint16Array(o),t.HEAP32=O=new Int32Array(o),t.HEAPU32=W=new Uint32Array(o),Y=new Float32Array(o),P=new Float64Array(o),se=new BigInt64Array(o),ne=new BigUint64Array(o)}function F(){U=!0,n?$():at.vb()}function V(o){throw I(o="Aborted("+o+")"),C=!0,o=new WebAssembly.RuntimeError(o+". Build with -sASSERTIONS for more info."),S?.(o),o}function Se(){return{a:{na:xg,jb:vg,g:tm,G:rm,f:im,o:nm,h:am,$:sm,b:om,S:um,Ja:Na,n:lm,aa:La,_a:qa,Fa:Wa,Ha:Va,$a:Ga,Ya:Ha,Ra:Fa,Xa:ja,la:Ka,Ga:Za,Da:Qa,Za:Xa,Ea:Ya,eb:dm,ga:pm,ya:cm,wa:hm,fa:gm,N:ym,I:_m,xa:wm,_:Tm,za:Im,Ua:Em,Ba:zm,Ka:Am,ua:Om,ha:Rm,Ta:ci,bb:Bm,Q:Um,r:Vm,c:di,kb:Gm,y:Hm,M:Fm,D:jm,m:Km,s:ss,lb:Zm,J:Qm,R:Xm,j:Ym,u:Jm,q:eg,k:tg,Oa:rg,Pa:ig,Qa:ng,Ma:ds,Na:ps,va:cs,gb:sg,db:ug,v:lg,ba:dg,ia:pg,cb:og,V:cg,ab:fg,Ca:hg,F:ag,U:mg,ma:Er,Aa:yg,ib:gg,hb:_g,Va:gs,Wa:ys,Ia:ai,T:_s,La:ws,ka:$s,Sa:bs,ja:vs,nb:o0,oa:r0,ob:s0,pa:t0,H:Gg,e:Ig,t:kg,w:Sg,B:Ug,pb:Yg,Z:Xg,x:Ag,qa:Jg,X:i0,ca:Qg,qb:Zg,ea:Cg,O:Pg,sb:Fg,ra:Kg,tb:Hg,L:Wg,Y:e0,d:Tg,A:zg,l:Eg,mb:u0,p:Rg,z:Bg,C:Og,E:Mg,K:Lg,sa:Vg,P:n0,da:qg,W:a0,ub:Dg,ta:Ng,rb:jg,i:$g,a:ct,fb:Qt}}}async function Ve(){function o(f,b){var E=at=f.exports;f={};for(let[z,B]of Object.entries(E))typeof B=="function"?(E=Mm(B),f[z]=E):f[z]=B;return at=f,at=(function(){var z=at,B=G=>ae=>G(ae)>>>0,q=G=>()=>G()>>>0;return(z=Object.assign({},z)).wb=B(z.wb),z.ec=q(z.ec),z.gc=B(z.gc),z.uc=B(z.uc),z.vc=q(z.vc),z.zc=B(z.zc),z})(),Ea.push(at.hc),xs=(f=at).wb,Ss=f.xb,t._OrtInit=f.yb,t._OrtGetLastError=f.zb,t._OrtCreateSessionOptions=f.Ab,t._OrtAppendExecutionProvider=f.Bb,t._OrtGetEpDevices=f.Cb,t._OrtEpDevice_EpName=f.Db,t._OrtAppendExecutionProviderV2=f.Eb,t._OrtAddFreeDimensionOverride=f.Fb,t._OrtAddSessionConfigEntry=f.Gb,t._OrtReleaseSessionOptions=f.Hb,t._OrtCreateSession=f.Ib,t._OrtReleaseSession=f.Jb,t._OrtGetInputOutputCount=f.Kb,t._OrtGetInputOutputMetadata=f.Lb,t._OrtFree=f.Mb,t._OrtCreateTensor=f.Nb,t._OrtGetTensorData=f.Ob,t._OrtReleaseTensor=f.Pb,t._OrtCreateLoraAdapter=f.Qb,t._OrtReleaseLoraAdapter=f.Rb,t._OrtCreateRunOptions=f.Sb,t._OrtAddRunConfigEntry=f.Tb,t._OrtRunOptionsAddActiveLoraAdapter=f.Ub,t._OrtReleaseRunOptions=f.Vb,t._OrtCreateBinding=f.Wb,t._OrtBindInput=f.Xb,t._OrtBindOutput=f.Yb,t._OrtClearBoundOutputs=f.Zb,t._OrtReleaseBinding=f._b,t._OrtRunWithBinding=f.$b,t._OrtRun=f.ac,t._OrtEndProfiling=f.bc,t._JsepOutput=f.cc,t._JsepGetNodeName=f.dc,Cr=f.ec,tt=t._free=f.fc,Jt=t._malloc=f.gc,$i=f.jc,ks=f.kc,Ts=f.lc,Is=f.mc,bi=f.nc,Es=f.oc,Cs=f.pc,le=f.qc,er=f.rc,zs=f.sc,oe=f.tc,vi=f.uc,ue=f.vc,As=f.wc,xi=f.xc,Os=f.yc,Rs=f.zc,Bs=f.Ac,Si=f.Bc,Ms=f.Cc,Ns=f.Dc,Ds=f.Ec,Us=f.Fc,Ps=f.Gc,Ls=f.Hc,qs=f.Ic,Ws=f.Jc,Vs=f.Kc,Gs=f.Lc,Hs=f.Mc,Fs=f.Nc,js=f.Oc,Ks=f.Pc,Zs=f.Qc,Qs=f.Rc,Xs=f.Sc,Ys=f.Tc,Js=f.Uc,eo=f.Vc,to=f.Wc,ro=f.Xc,io=f.Yc,no=f._c,ao=f.$c,so=f.kd,oo=f.ld,uo=f.qd,lo=f.vd,po=f.wd,co=f.xd,fo=f.yd,ho=f.zd,mo=f.Ad,go=f.Bd,yo=f.Gd,_o=f.Jd,wo=f.fe,$o=f.ge,bo=f.he,vo=f.ie,_=b,at}var d,m=Se();return t.instantiateWasm?new Promise(f=>{t.instantiateWasm(m,(b,E)=>{f(o(b,E))})}):n?o(new WebAssembly.Instance(_,Se()),_):(te??=t.locateFile?t.locateFile?t.locateFile("ort-wasm-simd-threaded.jsep.wasm",h):h+"ort-wasm-simd-threaded.jsep.wasm":new URL(""+new URL("ort-wasm-simd-threaded.jsep.wasm",import.meta.url).href,import.meta.url).href,d=await(async function(f){var b=te;if(!g&&!A(b))try{var E=fetch(b,{credentials:"same-origin"});return await WebAssembly.instantiateStreaming(E,f)}catch(z){I(`wasm streaming compile failed: ${z}`),I("falling back to ArrayBuffer instantiation")}return(async function(z,B){try{var q=await(async function(G){if(!g)try{var ae=await u(G);return new Uint8Array(ae)}catch{}if(G==te&&g)G=new Uint8Array(g);else{if(!l)throw"both async and sync fetching of the wasm failed";G=l(G)}return G})(z);return await WebAssembly.instantiate(q,B)}catch(G){I(`failed to asynchronously prepare wasm: ${G}`),V(G)}})(b,f)})(m),o(d.instance,d.module))}class ze{name="ExitStatus";constructor(d){this.message=`Program terminated with exit(${d})`,this.status=d}}var Ie=o=>{o.terminate(),o.onmessage=()=>{}},ke=[],Ye=0,$e=null,be=o=>{pt.length==0&&(Oa(),Aa(pt[0]));var d=pt.pop();if(!d)return 6;Xt.push(d),bt[o.ad]=d,d.ad=o.ad;var m={bd:"run",Xd:o.Wd,nd:o.nd,ad:o.ad};return d.postMessage(m,o.ud),0},Ae=0,ye=(o,d,...m)=>{var f,b=16*m.length,E=ue(),z=vi(b),B=z>>>3;for(f of m)typeof f=="bigint"?((x(),se)[B++>>>0]=1n,(x(),se)[B++>>>0]=f):((x(),se)[B++>>>0]=0n,(x(),P)[B++>>>0]=f);return o=Ts(o,0,b,z,d),oe(E),o};function Qt(o){if(n)return ye(0,1,o);if(y=o,!(0<Ae)){for(var d of Xt)Ie(d);for(d of pt)Ie(d);pt=[],Xt=[],bt={},C=!0}p(0,new ze(o))}function Ia(o){if(n)return ye(1,0,o);ai(o)}var ai=o=>{if(y=o,n)throw Ia(o),"unwind";Qt(o)},pt=[],Xt=[],Ea=[],bt={},Ca=o=>{var d=o.ad;delete bt[d],pt.push(o),Xt.splice(Xt.indexOf(o),1),o.ad=0,Is(d)};function za(){Ea.forEach(o=>o())}var Aa=o=>new Promise(d=>{o.onmessage=b=>{var E=b.data;if(b=E.bd,E.md&&E.md!=Cr()){var z=bt[E.md];z?z.postMessage(E,E.ud):I(`Internal error! Worker sent a message "${b}" to target pthread ${E.md}, but that thread no longer exists!`)}else b==="checkMailbox"?xr():b==="spawnThread"?be(E):b==="cleanupThread"?vr(()=>{Ca(bt[E.Yd])}):b==="loaded"?(o.loaded=!0,d(o)):E.target==="setimmediate"?o.postMessage(E):b==="uncaughtException"?o.onerror(E.error):b==="callHandler"?t[E.Fd](...E.args):b&&I(`worker sent an unknown command ${b}`)},o.onerror=b=>{throw I(`worker sent an error! ${b.filename}:${b.lineno}: ${b.message}`),b};var m,f=[];for(m of[])t.propertyIsEnumerable(m)&&f.push(m);o.postMessage({bd:"load",Hd:f,Zd:ct,$d:_})});function Oa(){var o=new Worker((()=>{let d=URL;return import.meta.url>"file:"&&import.meta.url<"file;"?new d("ort.bundle.min.mjs",import.meta.url):new URL(import.meta.url)})(),{type:"module",workerData:"em-pthread",name:"em-pthread"});pt.push(o)}var ct,em=(o,d)=>{Ae=0,o=Si(o,d),0<Ae?y=o:bi(o)},wr=[],$r=0;function tm(o){var d=new si(o>>>=0);return(x(),L)[d.cd+12>>>0]==0&&(Ra(d,!0),$r--),Ba(d,!1),wr.push(d),Rs(o)}var Lt=0,rm=()=>{le(0,0);var o=wr.pop();As(o.od),Lt=0};function Ra(o,d){d=d?1:0,(x(),L)[o.cd+12>>>0]=d}function Ba(o,d){d=d?1:0,(x(),L)[o.cd+13>>>0]=d}class si{constructor(d){this.od=d,this.cd=d-24}}var oi=o=>{var d=Lt;if(!d)return er(0),0;var m=new si(d);(x(),W)[m.cd+16>>>2>>>0]=d;var f=(x(),W)[m.cd+4>>>2>>>0];if(!f)return er(0),d;for(var b of o){if(b===0||b===f)break;if(Os(b,f,m.cd+16))return er(b),d}return er(f),d};function im(){return oi([])}function nm(o){return oi([o>>>0])}function am(o,d,m,f){return oi([o>>>0,d>>>0,m>>>0,f>>>0])}var sm=()=>{var o=wr.pop();o||V("no exception to throw");var d=o.od;throw(x(),L)[o.cd+13>>>0]==0&&(wr.push(o),Ba(o,!0),Ra(o,!1),$r++),xi(d),Lt=d};function om(o,d,m){var f=new si(o>>>=0);throw d>>>=0,m>>>=0,(x(),W)[f.cd+16>>>2>>>0]=0,(x(),W)[f.cd+4>>>2>>>0]=d,(x(),W)[f.cd+8>>>2>>>0]=m,xi(o),$r++,Lt=o}var um=()=>$r;function Ma(o,d,m,f){return n?ye(2,1,o,d,m,f):Na(o,d,m,f)}function Na(o,d,m,f){if(o>>>=0,d>>>=0,m>>>=0,f>>>=0,!globalThis.SharedArrayBuffer)return 6;var b=[];return n&&b.length===0?Ma(o,d,m,f):(o={Wd:m,ad:o,nd:f,ud:b},n?(o.bd="spawnThread",postMessage(o,b),0):be(o))}function lm(o){throw Lt||=o>>>0,Lt}var Da=globalThis.TextDecoder&&new TextDecoder,Ua=(o,d,m,f)=>{if(m=d+m,f)return m;for(;o[d]&&!(d>=m);)++d;return d},Pa=(o,d=0,m,f)=>{if(16<(m=Ua(o,d>>>=0,m,f))-d&&o.buffer&&Da)return Da.decode(o.buffer instanceof ArrayBuffer?o.subarray(d,m):o.slice(d,m));for(f="";d<m;){var b=o[d++];if(128&b){var E=63&o[d++];if((224&b)==192)f+=String.fromCharCode((31&b)<<6|E);else{var z=63&o[d++];65536>(b=(240&b)==224?(15&b)<<12|E<<6|z:(7&b)<<18|E<<12|z<<6|63&o[d++])?f+=String.fromCharCode(b):(b-=65536,f+=String.fromCharCode(55296|b>>10,56320|1023&b))}}else f+=String.fromCharCode(b)}return f},Te=(o,d,m)=>(o>>>=0)?Pa((x(),X),o,d,m):"";function La(o,d,m){return n?ye(3,1,o,d,m):0}function qa(o,d){if(n)return ye(4,1,o,d)}function Wa(o,d){if(n)return ye(5,1,o,d)}function Va(o,d,m){if(n)return ye(6,1,o,d,m)}function Ga(o,d,m){return n?ye(7,1,o,d,m):0}function Ha(o,d){if(n)return ye(8,1,o,d)}function Fa(o,d,m){if(n)return ye(9,1,o,d,m)}function ja(o,d,m,f){if(n)return ye(10,1,o,d,m,f)}function Ka(o,d,m,f){if(n)return ye(11,1,o,d,m,f)}function Za(o,d,m,f){if(n)return ye(12,1,o,d,m,f)}function Qa(o){if(n)return ye(13,1,o)}function Xa(o,d){if(n)return ye(14,1,o,d)}function Ya(o,d,m){if(n)return ye(15,1,o,d,m)}var dm=()=>V(""),Je=o=>{o>>>=0;for(var d="";;){var m=(x(),X)[o++>>>0];if(!m)return d;d+=String.fromCharCode(m)}},ui={},li={},qt=class extends Error{constructor(o){super(o),this.name="BindingError"}};function nt(o,d,m={}){return(function(f,b,E={}){var z=b.name;if(!f)throw new qt(`type "${z}" must have a positive integer typeid pointer`);if(li.hasOwnProperty(f)){if(E.Id)return;throw new qt(`Cannot register type '${z}' twice`)}li[f]=b,ui.hasOwnProperty(f)&&(b=ui[f],delete ui[f],b.forEach(B=>B()))})(o,d,m)}var Ja=(o,d,m)=>{switch(d){case 1:return m?f=>(x(),L)[f>>>0]:f=>(x(),X)[f>>>0];case 2:return m?f=>(x(),Q)[f>>>1>>>0]:f=>(x(),J)[f>>>1>>>0];case 4:return m?f=>(x(),O)[f>>>2>>>0]:f=>(x(),W)[f>>>2>>>0];case 8:return m?f=>(x(),se)[f>>>3>>>0]:f=>(x(),ne)[f>>>3>>>0];default:throw new TypeError(`invalid integer width (${d}): ${o}`)}};function pm(o,d,m,f,b){o>>>=0,m>>>=0,d=Je(d>>>0);let E=z=>z;if(f=f===0n){let z=8*m;E=B=>BigInt.asUintN(z,B),b=E(b)}nt(o,{name:d,Zc:E,ed:(z,B)=>(typeof B=="number"&&(B=BigInt(B)),B),dd:Ja(d,m,!f),gd:null})}function cm(o,d,m,f){nt(o>>>=0,{name:d=Je(d>>>0),Zc:function(b){return!!b},ed:function(b,E){return E?m:f},dd:function(b){return this.Zc((x(),X)[b>>>0])},gd:null})}var es=[],vt=[0,1,,1,null,1,!0,1,!1,1];function di(o){9<(o>>>=0)&&--vt[o+1]===0&&(vt[o]=void 0,es.push(o))}var Le=o=>{if(!o)throw new qt(`Cannot use deleted val. handle = ${o}`);return vt[o]},Ge=o=>{switch(o){case void 0:return 2;case null:return 4;case!0:return 6;case!1:return 8;default:let d=es.pop()||vt.length;return vt[d]=o,vt[d+1]=1,d}};function pi(o){return this.Zc((x(),W)[o>>>2>>>0])}var fm={name:"emscripten::val",Zc:o=>{var d=Le(o);return di(o),d},ed:(o,d)=>Ge(d),dd:pi,gd:null};function hm(o){return nt(o>>>0,fm)}var mm=(o,d)=>{switch(d){case 4:return function(m){return this.Zc((x(),Y)[m>>>2>>>0])};case 8:return function(m){return this.Zc((x(),P)[m>>>3>>>0])};default:throw new TypeError(`invalid float width (${d}): ${o}`)}};function gm(o,d,m){m>>>=0,nt(o>>>=0,{name:d=Je(d>>>0),Zc:f=>f,ed:(f,b)=>b,dd:mm(d,m),gd:null})}function ym(o,d,m,f,b){o>>>=0,m>>>=0,d=Je(d>>>0);let E=B=>B;if(f===0){var z=32-8*m;E=B=>B<<z>>>z,b=E(b)}nt(o,{name:d,Zc:E,ed:(B,q)=>q,dd:Ja(d,m,f!==0),gd:null})}function _m(o,d,m){function f(E){var z=(x(),W)[E>>>2>>>0];return E=(x(),W)[E+4>>>2>>>0],new b((x(),L).buffer,E,z)}var b=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigInt64Array,BigUint64Array][d];nt(o>>>=0,{name:m=Je(m>>>0),Zc:f,dd:f},{Id:!0})}var ft=(o,d,m)=>{var f=(x(),X);if(d>>>=0,0<m){var b=d;m=d+m-1;for(var E=0;E<o.length;++E){var z=o.codePointAt(E);if(127>=z){if(d>=m)break;f[d++>>>0]=z}else if(2047>=z){if(d+1>=m)break;f[d++>>>0]=192|z>>6,f[d++>>>0]=128|63&z}else if(65535>=z){if(d+2>=m)break;f[d++>>>0]=224|z>>12,f[d++>>>0]=128|z>>6&63,f[d++>>>0]=128|63&z}else{if(d+3>=m)break;f[d++>>>0]=240|z>>18,f[d++>>>0]=128|z>>12&63,f[d++>>>0]=128|z>>6&63,f[d++>>>0]=128|63&z,E++}}f[d>>>0]=0,o=d-b}else o=0;return o},br=o=>{for(var d=0,m=0;m<o.length;++m){var f=o.charCodeAt(m);127>=f?d++:2047>=f?d+=2:55296<=f&&57343>=f?(d+=4,++m):d+=3}return d};function wm(o,d){nt(o>>>=0,{name:d=Je(d>>>0),Zc(m){var f=(x(),W)[m>>>2>>>0];return f=Te(m+4,f,!0),tt(m),f},ed(m,f){f instanceof ArrayBuffer&&(f=new Uint8Array(f));var b=typeof f=="string";if(!(b||ArrayBuffer.isView(f)&&f.BYTES_PER_ELEMENT==1))throw new qt("Cannot pass non-string to std::string");var E=b?br(f):f.length,z=Jt(4+E+1),B=z+4;return(x(),W)[z>>>2>>>0]=E,b?ft(f,B,E+1):(x(),X).set(f,B>>>0),m!==null&&m.push(tt,z),z},dd:pi,gd(m){tt(m)}})}var ts=globalThis.TextDecoder?new TextDecoder("utf-16le"):void 0,$m=(o,d,m)=>{if(o>>>=1,16<(d=Ua((x(),J),o,d/2,m))-o&&ts)return ts.decode((x(),J).slice(o,d));for(m="";o<d;++o){var f=(x(),J)[o>>>0];m+=String.fromCharCode(f)}return m},bm=(o,d,m)=>{if(m??=2147483647,2>m)return 0;var f=d;m=(m-=2)<2*o.length?m/2:o.length;for(var b=0;b<m;++b){var E=o.charCodeAt(b);(x(),Q)[d>>>1>>>0]=E,d+=2}return(x(),Q)[d>>>1>>>0]=0,d-f},vm=o=>2*o.length,xm=(o,d,m)=>{var f="";o>>>=2;for(var b=0;!(b>=d/4);b++){var E=(x(),W)[o+b>>>0];if(!E&&!m)break;f+=String.fromCodePoint(E)}return f},Sm=(o,d,m)=>{if(d>>>=0,m??=2147483647,4>m)return 0;var f=d;m=f+m-4;for(var b=0;b<o.length;++b){var E=o.codePointAt(b);if(65535<E&&b++,(x(),O)[d>>>2>>>0]=E,(d+=4)+4>m)break}return(x(),O)[d>>>2>>>0]=0,d-f},km=o=>{for(var d=0,m=0;m<o.length;++m)65535<o.codePointAt(m)&&m++,d+=4;return d};function Tm(o,d,m){if(o>>>=0,d>>>=0,m=Je(m>>>=0),d===2)var f=$m,b=bm,E=vm;else f=xm,b=Sm,E=km;nt(o,{name:m,Zc:z=>{var B=(x(),W)[z>>>2>>>0];return B=f(z+4,B*d,!0),tt(z),B},ed:(z,B)=>{if(typeof B!="string")throw new qt(`Cannot pass non-string to C++ string type ${m}`);var q=E(B),G=Jt(4+q+d);return(x(),W)[G>>>2>>>0]=q/d,b(B,G+4,q+d),z!==null&&z.push(tt,G),G},dd:pi,gd(z){tt(z)}})}function Im(o,d){nt(o>>>=0,{Kd:!0,name:d=Je(d>>>0),Zc:()=>{},ed:()=>{}})}function Em(o){$i(o>>>0,!i,1,!r,131072,!1),za()}var vr=o=>{if(!C)try{if(o(),!(0<Ae))try{n?Cr()&&bi(y):ai(y)}catch(d){d instanceof ze||d=="unwind"||p(0,d)}}catch(d){d instanceof ze||d=="unwind"||p(0,d)}},Cm=!Atomics.waitAsync||globalThis.navigator?.userAgent&&91>Number((navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./)||[])[2]);function ci(o){o>>>=0,Cm||(Atomics.waitAsync((x(),O),o>>>2,o).value.then(xr),o+=128,Atomics.store((x(),O),o>>>2,1))}var xr=()=>vr(()=>{var o=Cr();o&&(ci(o),Cs())});function zm(o,d){(o>>>=0)==d>>>0?setTimeout(xr):n?postMessage({md:o,bd:"checkMailbox"}):(o=bt[o])&&o.postMessage({bd:"checkMailbox"})}var fi=[];function Am(o,d,m,f,b){for(d>>>=0,b>>>=0,fi.length=0,m=b>>>3,f=b+f>>>3;m<f;){var E;E=(x(),se)[m++>>>0]?(x(),se)[m++>>>0]:(x(),P)[m++>>>0],fi.push(E)}return(d?ki[d]:bg[o])(...fi)}var Om=()=>{Ae=0};function Rm(o){o>>>=0,n?postMessage({bd:"cleanupThread",Yd:o}):Ca(bt[o])}function Bm(o){}var Sr=o=>{try{o()}catch(d){V(d)}};function Mm(o){var d=(...m)=>{kr.push(o);try{return o(...m)}finally{C||(kr.pop(),et&&ht===1&&kr.length===0&&(ht=0,Ae+=1,Sr($o),typeof Fibers<"u"&&Fibers.ne()))}};return ns.set(o,d),d}var ht=0,et=null,rs=0,kr=[],hi=new Map,is=new Map,ns=new Map,Nm=0,mi=null,Dm=[],as=o=>(function(d){if(!C){if(ht===0){var m=!1,f=!1;d((b=0)=>{if(!C&&(rs=b,m=!0,f)){ht=2,Sr(()=>bo(et)),typeof MainLoop<"u"&&MainLoop.Ed&&MainLoop.resume(),b=!1;try{var E=(function(){var q=(x(),O)[et+8>>>2>>>0];return q=is.get(q),q=ns.get(q),--Ae,q()})()}catch(q){E=q,b=!0}var z=!1;if(!et){var B=mi;B&&(mi=null,(b?B.reject:B.resolve)(E),z=!0)}if(b&&!z)throw E}}),f=!0,m||(ht=1,et=(function(){var b=Jt(65548),E=b+12;if((x(),W)[b>>>2>>>0]=E,(x(),W)[b+4>>>2>>>0]=E+65536,E=kr[0],!hi.has(E)){var z=Nm++;hi.set(E,z),is.set(z,E)}return E=hi.get(E),(x(),O)[b+8>>>2>>>0]=E,b})(),typeof MainLoop<"u"&&MainLoop.Ed&&MainLoop.pause(),Sr(()=>wo(et)))}else ht===2?(ht=0,Sr(vo),tt(et),et=null,Dm.forEach(vr)):V(`invalid state: ${ht}`);return rs}})(d=>{o().then(d)});function Um(o){return o>>>=0,as(async()=>{var d=await Le(o);return Ge(d)})}var gi=[],Pm=o=>{var d=gi.length;return gi.push(o),d},Lm=(o,d)=>{for(var m=Array(o),f=0;f<o;++f){var b=f,E=(x(),W)[d+4*f>>>2>>>0],z=li[E];if(z===void 0)throw o=`parameter ${f}`,E=xs(E),d=Je(E),tt(E),new qt(`${o} has unknown type ${d}`);m[b]=z}return m},qm=(o,d,m)=>{var f=[];return o=o(f,m),f.length&&((x(),W)[d>>>2>>>0]=Ge(f)),o},Wm={},Tr=o=>{var d=Wm[o];return d===void 0?Je(o):d};function Vm(o,d,m){var[f,...b]=Lm(o,d>>>0);d=f.ed.bind(f);var E=b.map(q=>q.dd.bind(q));o--;var z={toValue:Le};switch(o=E.map((q,G)=>{var ae=`argFromPtr${G}`;return z[ae]=q,`${ae}(args${G?"+"+8*G:""})`}),m){case 0:var B="toValue(handle)";break;case 2:B="new (toValue(handle))";break;case 3:B="";break;case 1:z.getStringOrSymbol=Tr,B="toValue(handle)[getStringOrSymbol(methodName)]"}return B+=`(${o})`,f.Kd||(z.toReturnWire=d,z.emval_returnValue=qm,B=`return emval_returnValue(toReturnWire, destructorsRef, ${B})`),B=`return function (handle, methodName, destructorsRef, args) {
  ${B}
  }`,m=new Function(Object.keys(z),B)(...Object.values(z)),B=`methodCaller<(${b.map(q=>q.name)}) => ${f.name}>`,Pm(Object.defineProperty(m,"name",{value:B}))}function Gm(o,d){return d>>>=0,(o=Le(o>>>0))==Le(d)}function Hm(o){return(o>>>=0)?(o=Tr(o),Ge(globalThis[o])):Ge(globalThis)}function Fm(o){return o=Tr(o>>>0),Ge(t[o])}function jm(o,d){return d>>>=0,o=Le(o>>>0),d=Le(d),Ge(o[d])}function Km(o){9<(o>>>=0)&&(vt[o+1]+=1)}function ss(o,d,m,f,b){return gi[o>>>0](d>>>0,m>>>0,f>>>0,b>>>0)}function Zm(o,d,m,f,b){return ss(o>>>0,d>>>0,m>>>0,f>>>0,b>>>0)}function Qm(){return Ge([])}function Xm(o){o=Le(o>>>0);for(var d=Array(o.length),m=0;m<o.length;m++)d[m]=o[m];return Ge(d)}function Ym(o){return Ge(Tr(o>>>0))}function Jm(){return Ge({})}function eg(o){for(var d=Le(o>>>=0);d.length;){var m=d.pop();d.pop()(m)}di(o)}function tg(o,d,m){d>>>=0,m>>>=0,o=Le(o>>>0),d=Le(d),m=Le(m),o[d]=m}function rg(o,d){o=-9007199254740992>o||9007199254740992<o?NaN:Number(o),d>>>=0,o=new Date(1e3*o),(x(),O)[d>>>2>>>0]=o.getUTCSeconds(),(x(),O)[d+4>>>2>>>0]=o.getUTCMinutes(),(x(),O)[d+8>>>2>>>0]=o.getUTCHours(),(x(),O)[d+12>>>2>>>0]=o.getUTCDate(),(x(),O)[d+16>>>2>>>0]=o.getUTCMonth(),(x(),O)[d+20>>>2>>>0]=o.getUTCFullYear()-1900,(x(),O)[d+24>>>2>>>0]=o.getUTCDay(),o=(o.getTime()-Date.UTC(o.getUTCFullYear(),0,1,0,0,0,0))/864e5|0,(x(),O)[d+28>>>2>>>0]=o}var os=o=>o%4==0&&(o%100!=0||o%400==0),us=[0,31,60,91,121,152,182,213,244,274,305,335],ls=[0,31,59,90,120,151,181,212,243,273,304,334];function ig(o,d){o=-9007199254740992>o||9007199254740992<o?NaN:Number(o),d>>>=0,o=new Date(1e3*o),(x(),O)[d>>>2>>>0]=o.getSeconds(),(x(),O)[d+4>>>2>>>0]=o.getMinutes(),(x(),O)[d+8>>>2>>>0]=o.getHours(),(x(),O)[d+12>>>2>>>0]=o.getDate(),(x(),O)[d+16>>>2>>>0]=o.getMonth(),(x(),O)[d+20>>>2>>>0]=o.getFullYear()-1900,(x(),O)[d+24>>>2>>>0]=o.getDay();var m=(os(o.getFullYear())?us:ls)[o.getMonth()]+o.getDate()-1|0;(x(),O)[d+28>>>2>>>0]=m,(x(),O)[d+36>>>2>>>0]=-60*o.getTimezoneOffset(),m=new Date(o.getFullYear(),6,1).getTimezoneOffset();var f=new Date(o.getFullYear(),0,1).getTimezoneOffset();o=0|(m!=f&&o.getTimezoneOffset()==Math.min(f,m)),(x(),O)[d+32>>>2>>>0]=o}function ng(o){o>>>=0;var d=new Date((x(),O)[o+20>>>2>>>0]+1900,(x(),O)[o+16>>>2>>>0],(x(),O)[o+12>>>2>>>0],(x(),O)[o+8>>>2>>>0],(x(),O)[o+4>>>2>>>0],(x(),O)[o>>>2>>>0],0),m=(x(),O)[o+32>>>2>>>0],f=d.getTimezoneOffset(),b=new Date(d.getFullYear(),6,1).getTimezoneOffset(),E=new Date(d.getFullYear(),0,1).getTimezoneOffset(),z=Math.min(E,b);return 0>m?(x(),O)[o+32>>>2>>>0]=+(b!=E&&z==f):0<m!=(z==f)&&(b=Math.max(E,b),d.setTime(d.getTime()+6e4*((0<m?z:b)-f))),(x(),O)[o+24>>>2>>>0]=d.getDay(),m=(os(d.getFullYear())?us:ls)[d.getMonth()]+d.getDate()-1|0,(x(),O)[o+28>>>2>>>0]=m,(x(),O)[o>>>2>>>0]=d.getSeconds(),(x(),O)[o+4>>>2>>>0]=d.getMinutes(),(x(),O)[o+8>>>2>>>0]=d.getHours(),(x(),O)[o+12>>>2>>>0]=d.getDate(),(x(),O)[o+16>>>2>>>0]=d.getMonth(),(x(),O)[o+20>>>2>>>0]=d.getYear(),o=d.getTime(),BigInt(isNaN(o)?-1:o/1e3)}function ds(o,d,m,f,b,E,z){return n?ye(16,1,o,d,m,f,b,E,z):-52}function ps(o,d,m,f,b,E){if(n)return ye(17,1,o,d,m,f,b,E)}var Yt={},ag=()=>performance.timeOrigin+performance.now();function cs(o,d){if(n)return ye(18,1,o,d);if(Yt[o]&&(clearTimeout(Yt[o].id),delete Yt[o]),!d)return 0;var m=setTimeout(()=>{delete Yt[o],vr(()=>Es(o,performance.timeOrigin+performance.now()))},d);return Yt[o]={id:m,me:d},0}function sg(o,d,m,f){o>>>=0,d>>>=0,m>>>=0,f>>>=0;var b=new Date().getFullYear(),E=new Date(b,0,1).getTimezoneOffset();b=new Date(b,6,1).getTimezoneOffset();var z=Math.max(E,b);(x(),W)[o>>>2>>>0]=60*z,(x(),O)[d>>>2>>>0]=+(E!=b),o=(d=B=>{var q=Math.abs(B);return`UTC${0<=B?"-":"+"}${String(Math.floor(q/60)).padStart(2,"0")}${String(q%60).padStart(2,"0")}`})(E),d=d(b),b<E?(ft(o,m,17),ft(d,f,17)):(ft(o,f,17),ft(d,m,17))}var og=()=>Date.now();function ug(o,d,m){return m>>>=0,0<=o&&3>=o?(o===0?o=Date.now():o=performance.timeOrigin+performance.now(),o=Math.round(1e6*o),(x(),se)[m>>>3>>>0]=BigInt(o),0):28}var yi=[],fs=(o,d)=>{yi.length=0;for(var m;m=(x(),X)[o++>>>0];){var f=m!=105;d+=(f&=m!=112)&&d%8?4:0,yi.push(m==112?(x(),W)[d>>>2>>>0]:m==106?(x(),se)[d>>>3>>>0]:m==105?(x(),O)[d>>>2>>>0]:(x(),P)[d>>>3>>>0]),d+=f?8:4}return yi};function lg(o,d,m){return o>>>=0,d=fs(d>>>0,m>>>0),ki[o](...d)}function dg(o,d,m){return o>>>=0,d=fs(d>>>0,m>>>0),ki[o](...d)}var pg=()=>{};function cg(o,d){return I(Te(o>>>0,d>>>0))}var fg=()=>{throw Ae+=1,"unwind"};function hg(){return 4294901760}var mg=()=>navigator.hardwareConcurrency,xt={},Ir=o=>{var d;return(d=/\bwasm-function\[\d+\]:(0x[0-9a-f]+)/.exec(o))?+d[1]:(d=/:(\d+):\d+(?:\)|$)/.exec(o))?2147483648|+d[1]:0},hs=o=>{for(var d of o)(o=Ir(d))&&(xt[o]=d)};function gg(){var o=Error().stack.toString().split(`
`);return o[0]=="Error"&&o.shift(),hs(o),xt.sd=Ir(o[3]),xt.Ud=o,xt.sd}function Er(o){if(!(o=xt[o>>>0]))return 0;var d;if(d=/^\s+at .*\.wasm\.(.*) \(.*\)$/.exec(o))o=d[1];else if(d=/^\s+at (.*) \(.*\)$/.exec(o))o=d[1];else{if(!(d=/^(.+?)@/.exec(o)))return 0;o=d[1]}tt(Er.td??0),d=br(o)+1;var m=Jt(d);return m&&ft(o,m,d),Er.td=m,Er.td}function yg(o){o>>>=0;var d=(x(),X).length;if(o<=d||4294901760<o)return!1;for(var m=1;4>=m;m*=2){var f=d*(1+.2/m);f=Math.min(f,o+100663296);e:{f=(Math.min(4294901760,65536*Math.ceil(Math.max(o,f)/65536))-ct.buffer.byteLength+65535)/65536|0;try{ct.grow(f),H();var b=1;break e}catch{}b=void 0}if(b)return!0}return!1}function _g(o,d,m){if(o>>>=0,d>>>=0,xt.sd==o)var f=xt.Ud;else(f=Error().stack.toString().split(`
`))[0]=="Error"&&f.shift(),hs(f);for(var b=3;f[b]&&Ir(f[b])!=o;)++b;for(o=0;o<m&&f[o+b];++o)(x(),O)[d+4*o>>>2>>>0]=Ir(f[o+b]);return o}var _i,wi={},ms=()=>{if(!_i){var o,d={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(globalThis.navigator?.language??"C").replace("-","_")+".UTF-8",_:"./this.program"};for(o in wi)wi[o]===void 0?delete d[o]:d[o]=wi[o];var m=[];for(o in d)m.push(`${o}=${d[o]}`);_i=m}return _i};function gs(o,d){if(n)return ye(19,1,o,d);o>>>=0,d>>>=0;var m,f=0,b=0;for(m of ms()){var E=d+f;(x(),W)[o+b>>>2>>>0]=E,f+=ft(m,E,1/0)+1,b+=4}return 0}function ys(o,d){if(n)return ye(20,1,o,d);o>>>=0,d>>>=0;var m=ms();for(var f of((x(),W)[o>>>2>>>0]=m.length,o=0,m))o+=br(f)+1;return(x(),W)[d>>>2>>>0]=o,0}function _s(o){return n?ye(21,1,o):52}function ws(o,d,m,f,b){return n?ye(22,1,o,d,m,f,b):52}function $s(o,d,m,f){return n?ye(23,1,o,d,m,f):52}function bs(o,d,m,f){return n?ye(24,1,o,d,m,f):70}var wg=[null,[],[]];function vs(o,d,m,f){if(n)return ye(25,1,o,d,m,f);d>>>=0,m>>>=0,f>>>=0;for(var b=0,E=0;E<m;E++){var z=(x(),W)[d>>>2>>>0],B=(x(),W)[d+4>>>2>>>0];d+=8;for(var q=0;q<B;q++){var G=o,ae=(x(),X)[z+q>>>0],pe=wg[G];ae===0||ae===10?((G===1?k:I)(Pa(pe)),pe.length=0):pe.push(ae)}b+=B}return(x(),W)[f>>>2>>>0]=b,0}function $g(o){return o>>>0}n||(function(){for(var o=t.numThreads-1;o--;)Oa();ke.push(async()=>{var d=(async function(){if(!n)return Promise.all(pt.map(Aa))})();Ye++,await d,--Ye==0&&$e&&(d=$e,$e=null,d())})})(),n||(ct=new WebAssembly.Memory({initial:256,maximum:65536,shared:!0}),H()),t.wasmBinary&&(g=t.wasmBinary),t.stackSave=()=>ue(),t.stackRestore=o=>oe(o),t.stackAlloc=o=>vi(o),t.setValue=function(o,d,m="i8"){switch(m.endsWith("*")&&(m="*"),m){case"i1":case"i8":(x(),L)[o>>>0]=d;break;case"i16":(x(),Q)[o>>>1>>>0]=d;break;case"i32":(x(),O)[o>>>2>>>0]=d;break;case"i64":(x(),se)[o>>>3>>>0]=BigInt(d);break;case"float":(x(),Y)[o>>>2>>>0]=d;break;case"double":(x(),P)[o>>>3>>>0]=d;break;case"*":(x(),W)[o>>>2>>>0]=d;break;default:V(`invalid type for setValue: ${m}`)}},t.getValue=function(o,d="i8"){switch(d.endsWith("*")&&(d="*"),d){case"i1":case"i8":return(x(),L)[o>>>0];case"i16":return(x(),Q)[o>>>1>>>0];case"i32":return(x(),O)[o>>>2>>>0];case"i64":return(x(),se)[o>>>3>>>0];case"float":return(x(),Y)[o>>>2>>>0];case"double":return(x(),P)[o>>>3>>>0];case"*":return(x(),W)[o>>>2>>>0];default:V(`invalid type for getValue: ${d}`)}},t.UTF8ToString=Te,t.stringToUTF8=ft,t.lengthBytesUTF8=br;var xs,Ss,Cr,tt,Jt,$i,ks,Ts,Is,bi,Es,Cs,le,er,zs,oe,vi,ue,As,xi,Os,Rs,Bs,Si,Ms,Ns,Ds,Us,Ps,Ls,qs,Ws,Vs,Gs,Hs,Fs,js,Ks,Zs,Qs,Xs,Ys,Js,eo,to,ro,io,no,ao,so,oo,uo,lo,po,co,fo,ho,mo,go,yo,_o,wo,$o,bo,vo,at,bg=[Qt,Ia,Ma,La,qa,Wa,Va,Ga,Ha,Fa,ja,Ka,Za,Qa,Xa,Ya,ds,ps,cs,gs,ys,_s,ws,$s,bs,vs],ki={1124124:(o,d,m,f,b)=>{if(t===void 0||!t.jd)return 1;if((o=Te(Number(o>>>0))).startsWith("./")&&(o=o.substring(2)),!(o=t.jd.get(o)))return 2;if(d=Number(d>>>0),m=Number(m>>>0),f=Number(f>>>0),d+m>o.byteLength)return 3;try{let E=o.subarray(d,d+m);switch(b){case 0:(x(),X).set(E,f>>>0);break;case 1:t.ae?t.ae(f,E):t.Td(f,E);break;default:return 4}return 0}catch{return 4}},1124948:()=>typeof navigator<"u"&&navigator.de?1:0,1125020:(o,d,m)=>{t.Dd(o,(x(),X).subarray(d>>>0,d+m>>>0))},1125084:()=>t.ce(),1125126:o=>{t.Cd(o)},1125163:()=>{t.Md()},1125194:()=>{t.Nd()},1125223:()=>{t.Rd()},1125248:o=>t.Ld(o),1125281:o=>t.Pd(o),1125313:(o,d,m)=>{t.rd(Number(o),Number(d),Number(m),!0)},1125376:(o,d,m)=>{t.rd(Number(o),Number(d),Number(m))},1125433:()=>typeof wasmOffsetConverter<"u",1125490:o=>{t.ic("Abs",o,void 0)},1125541:o=>{t.ic("Neg",o,void 0)},1125592:o=>{t.ic("Floor",o,void 0)},1125645:o=>{t.ic("Ceil",o,void 0)},1125697:o=>{t.ic("Reciprocal",o,void 0)},1125755:o=>{t.ic("Sqrt",o,void 0)},1125807:o=>{t.ic("Exp",o,void 0)},1125858:o=>{t.ic("Erf",o,void 0)},1125909:o=>{t.ic("Sigmoid",o,void 0)},1125964:(o,d,m)=>{t.ic("HardSigmoid",o,{alpha:d,beta:m})},1126043:o=>{t.ic("HardSwish",o,void 0)},1126100:o=>{t.ic("Log",o,void 0)},1126151:o=>{t.ic("Sin",o,void 0)},1126202:o=>{t.ic("Cos",o,void 0)},1126253:o=>{t.ic("Tan",o,void 0)},1126304:o=>{t.ic("Asin",o,void 0)},1126356:o=>{t.ic("Acos",o,void 0)},1126408:o=>{t.ic("Atan",o,void 0)},1126460:o=>{t.ic("Sinh",o,void 0)},1126512:o=>{t.ic("Cosh",o,void 0)},1126564:o=>{t.ic("Asinh",o,void 0)},1126617:o=>{t.ic("Acosh",o,void 0)},1126670:o=>{t.ic("Atanh",o,void 0)},1126723:o=>{t.ic("Tanh",o,void 0)},1126775:o=>{t.ic("Not",o,void 0)},1126826:(o,d,m)=>{t.ic("Clip",o,{min:d,max:m})},1126895:o=>{t.ic("Clip",o,void 0)},1126947:(o,d)=>{t.ic("Elu",o,{alpha:d})},1127005:o=>{t.ic("Gelu",o,void 0)},1127057:o=>{t.ic("Relu",o,void 0)},1127109:(o,d)=>{t.ic("LeakyRelu",o,{alpha:d})},1127173:(o,d)=>{t.ic("ThresholdedRelu",o,{alpha:d})},1127243:(o,d)=>{t.ic("Cast",o,{to:d})},1127301:o=>{t.ic("Add",o,void 0)},1127352:o=>{t.ic("Sub",o,void 0)},1127403:o=>{t.ic("Mul",o,void 0)},1127454:o=>{t.ic("Div",o,void 0)},1127505:o=>{t.ic("Pow",o,void 0)},1127556:o=>{t.ic("Equal",o,void 0)},1127609:o=>{t.ic("Greater",o,void 0)},1127664:o=>{t.ic("GreaterOrEqual",o,void 0)},1127726:o=>{t.ic("Less",o,void 0)},1127778:o=>{t.ic("LessOrEqual",o,void 0)},1127837:(o,d,m,f,b)=>{t.ic("ReduceMean",o,{keepDims:!!d,noopWithEmptyAxes:!!m,axes:f?Array.from((x(),O).subarray(Number(f)>>>0,Number(b)>>>0)):[]})},1128012:(o,d,m,f,b)=>{t.ic("ReduceMax",o,{keepDims:!!d,noopWithEmptyAxes:!!m,axes:f?Array.from((x(),O).subarray(Number(f)>>>0,Number(b)>>>0)):[]})},1128186:(o,d,m,f,b)=>{t.ic("ReduceMin",o,{keepDims:!!d,noopWithEmptyAxes:!!m,axes:f?Array.from((x(),O).subarray(Number(f)>>>0,Number(b)>>>0)):[]})},1128360:(o,d,m,f,b)=>{t.ic("ReduceProd",o,{keepDims:!!d,noopWithEmptyAxes:!!m,axes:f?Array.from((x(),O).subarray(Number(f)>>>0,Number(b)>>>0)):[]})},1128535:(o,d,m,f,b)=>{t.ic("ReduceSum",o,{keepDims:!!d,noopWithEmptyAxes:!!m,axes:f?Array.from((x(),O).subarray(Number(f)>>>0,Number(b)>>>0)):[]})},1128709:(o,d,m,f,b)=>{t.ic("ReduceL1",o,{keepDims:!!d,noopWithEmptyAxes:!!m,axes:f?Array.from((x(),O).subarray(Number(f)>>>0,Number(b)>>>0)):[]})},1128882:(o,d,m,f,b)=>{t.ic("ReduceL2",o,{keepDims:!!d,noopWithEmptyAxes:!!m,axes:f?Array.from((x(),O).subarray(Number(f)>>>0,Number(b)>>>0)):[]})},1129055:(o,d,m,f,b)=>{t.ic("ReduceLogSum",o,{keepDims:!!d,noopWithEmptyAxes:!!m,axes:f?Array.from((x(),O).subarray(Number(f)>>>0,Number(b)>>>0)):[]})},1129232:(o,d,m,f,b)=>{t.ic("ReduceSumSquare",o,{keepDims:!!d,noopWithEmptyAxes:!!m,axes:f?Array.from((x(),O).subarray(Number(f)>>>0,Number(b)>>>0)):[]})},1129412:(o,d,m,f,b)=>{t.ic("ReduceLogSumExp",o,{keepDims:!!d,noopWithEmptyAxes:!!m,axes:f?Array.from((x(),O).subarray(Number(f)>>>0,Number(b)>>>0)):[]})},1129592:o=>{t.ic("Where",o,void 0)},1129645:(o,d,m)=>{t.ic("Transpose",o,{perm:d?Array.from((x(),O).subarray(Number(d)>>>0,Number(m)>>>0)):[]})},1129769:(o,d,m,f)=>{t.ic("DepthToSpace",o,{blocksize:d,mode:Te(m),format:f?"NHWC":"NCHW"})},1129902:(o,d,m,f)=>{t.ic("DepthToSpace",o,{blocksize:d,mode:Te(m),format:f?"NHWC":"NCHW"})},1130035:(o,d,m,f)=>{t.ic("DFT",o,{axis:d,inverse:m,onesided:f})},1130127:(o,d,m,f,b,E,z,B,q,G,ae,pe,ge,we,mt)=>{t.ic("ConvTranspose",o,{format:q?"NHWC":"NCHW",autoPad:d,dilations:[m],group:f,kernelShape:[b],pads:[E,z],strides:[B],wIsConst:()=>!!(x(),L)[G>>>0],outputPadding:ae?Array.from((x(),O).subarray(Number(ae)>>>0,Number(pe)>>>0)):[],outputShape:ge?Array.from((x(),O).subarray(Number(ge)>>>0,Number(we)>>>0)):[],activation:Te(mt)})},1130560:(o,d,m,f,b,E,z,B,q,G,ae,pe,ge,we)=>{t.ic("ConvTranspose",o,{format:B?"NHWC":"NCHW",autoPad:d,dilations:Array.from((x(),O).subarray(Number(m)>>>0,(Number(m)>>>0)+2>>>0)),group:f,kernelShape:Array.from((x(),O).subarray(Number(b)>>>0,(Number(b)>>>0)+2>>>0)),pads:Array.from((x(),O).subarray(Number(E)>>>0,(Number(E)>>>0)+4>>>0)),strides:Array.from((x(),O).subarray(Number(z)>>>0,(Number(z)>>>0)+2>>>0)),wIsConst:()=>!!(x(),L)[q>>>0],outputPadding:G?Array.from((x(),O).subarray(Number(G)>>>0,Number(ae)>>>0)):[],outputShape:pe?Array.from((x(),O).subarray(Number(pe)>>>0,Number(ge)>>>0)):[],activation:Te(we)})},1131221:(o,d,m,f,b,E,z,B,q,G,ae,pe,ge,we,mt)=>{t.ic("ConvTranspose",o,{format:q?"NHWC":"NCHW",autoPad:d,dilations:[m],group:f,kernelShape:[b],pads:[E,z],strides:[B],wIsConst:()=>!!(x(),L)[G>>>0],outputPadding:ae?Array.from((x(),O).subarray(Number(ae)>>>0,Number(pe)>>>0)):[],outputShape:ge?Array.from((x(),O).subarray(Number(ge)>>>0,Number(we)>>>0)):[],activation:Te(mt)})},1131654:(o,d,m,f,b,E,z,B,q,G,ae,pe,ge,we)=>{t.ic("ConvTranspose",o,{format:B?"NHWC":"NCHW",autoPad:d,dilations:Array.from((x(),O).subarray(Number(m)>>>0,(Number(m)>>>0)+2>>>0)),group:f,kernelShape:Array.from((x(),O).subarray(Number(b)>>>0,(Number(b)>>>0)+2>>>0)),pads:Array.from((x(),O).subarray(Number(E)>>>0,(Number(E)>>>0)+4>>>0)),strides:Array.from((x(),O).subarray(Number(z)>>>0,(Number(z)>>>0)+2>>>0)),wIsConst:()=>!!(x(),L)[q>>>0],outputPadding:G?Array.from((x(),O).subarray(Number(G)>>>0,Number(ae)>>>0)):[],outputShape:pe?Array.from((x(),O).subarray(Number(pe)>>>0,Number(ge)>>>0)):[],activation:Te(we)})},1132315:(o,d)=>{t.ic("GlobalAveragePool",o,{format:d?"NHWC":"NCHW"})},1132406:(o,d,m,f,b,E,z,B,q,G,ae,pe,ge,we)=>{t.ic("AveragePool",o,{format:we?"NHWC":"NCHW",auto_pad:d,ceil_mode:m,count_include_pad:f,storage_order:b,dilations:E?Array.from((x(),O).subarray(Number(E)>>>0,Number(z)>>>0)):[],kernel_shape:B?Array.from((x(),O).subarray(Number(B)>>>0,Number(q)>>>0)):[],pads:G?Array.from((x(),O).subarray(Number(G)>>>0,Number(ae)>>>0)):[],strides:pe?Array.from((x(),O).subarray(Number(pe)>>>0,Number(ge)>>>0)):[]})},1132885:(o,d)=>{t.ic("GlobalAveragePool",o,{format:d?"NHWC":"NCHW"})},1132976:(o,d,m,f,b,E,z,B,q,G,ae,pe,ge,we)=>{t.ic("AveragePool",o,{format:we?"NHWC":"NCHW",auto_pad:d,ceil_mode:m,count_include_pad:f,storage_order:b,dilations:E?Array.from((x(),O).subarray(Number(E)>>>0,Number(z)>>>0)):[],kernel_shape:B?Array.from((x(),O).subarray(Number(B)>>>0,Number(q)>>>0)):[],pads:G?Array.from((x(),O).subarray(Number(G)>>>0,Number(ae)>>>0)):[],strides:pe?Array.from((x(),O).subarray(Number(pe)>>>0,Number(ge)>>>0)):[]})},1133455:(o,d)=>{t.ic("GlobalMaxPool",o,{format:d?"NHWC":"NCHW"})},1133542:(o,d,m,f,b,E,z,B,q,G,ae,pe,ge,we)=>{t.ic("MaxPool",o,{format:we?"NHWC":"NCHW",auto_pad:d,ceil_mode:m,count_include_pad:f,storage_order:b,dilations:E?Array.from((x(),O).subarray(Number(E)>>>0,Number(z)>>>0)):[],kernel_shape:B?Array.from((x(),O).subarray(Number(B)>>>0,Number(q)>>>0)):[],pads:G?Array.from((x(),O).subarray(Number(G)>>>0,Number(ae)>>>0)):[],strides:pe?Array.from((x(),O).subarray(Number(pe)>>>0,Number(ge)>>>0)):[]})},1134017:(o,d)=>{t.ic("GlobalMaxPool",o,{format:d?"NHWC":"NCHW"})},1134104:(o,d,m,f,b,E,z,B,q,G,ae,pe,ge,we)=>{t.ic("MaxPool",o,{format:we?"NHWC":"NCHW",auto_pad:d,ceil_mode:m,count_include_pad:f,storage_order:b,dilations:E?Array.from((x(),O).subarray(Number(E)>>>0,Number(z)>>>0)):[],kernel_shape:B?Array.from((x(),O).subarray(Number(B)>>>0,Number(q)>>>0)):[],pads:G?Array.from((x(),O).subarray(Number(G)>>>0,Number(ae)>>>0)):[],strides:pe?Array.from((x(),O).subarray(Number(pe)>>>0,Number(ge)>>>0)):[]})},1134579:(o,d,m,f,b)=>{t.ic("Gemm",o,{alpha:d,beta:m,transA:f,transB:b})},1134683:o=>{t.ic("MatMul",o,void 0)},1134737:(o,d,m,f)=>{t.ic("ArgMax",o,{keepDims:!!d,selectLastIndex:!!m,axis:f})},1134845:(o,d,m,f)=>{t.ic("ArgMin",o,{keepDims:!!d,selectLastIndex:!!m,axis:f})},1134953:(o,d)=>{t.ic("Softmax",o,{axis:d})},1135016:(o,d)=>{t.ic("Concat",o,{axis:d})},1135076:(o,d,m,f,b)=>{t.ic("Split",o,{axis:d,numOutputs:m,splitSizes:f?Array.from((x(),O).subarray(Number(f)>>>0,Number(b)>>>0)):[]})},1135232:o=>{t.ic("Expand",o,void 0)},1135286:(o,d)=>{t.ic("Gather",o,{axis:Number(d)})},1135357:(o,d)=>{t.ic("GatherElements",o,{axis:Number(d)})},1135436:(o,d)=>{t.ic("GatherND",o,{batch_dims:Number(d)})},1135515:(o,d,m,f,b,E,z,B,q,G,ae)=>{t.ic("Resize",o,{antialias:d,axes:m?Array.from((x(),O).subarray(Number(m)>>>0,Number(f)>>>0)):[],coordinateTransformMode:Te(b),cubicCoeffA:E,excludeOutside:z,extrapolationValue:B,keepAspectRatioPolicy:Te(q),mode:Te(G),nearestMode:Te(ae)})},1135877:(o,d,m,f,b,E,z)=>{t.ic("Slice",o,{starts:d?Array.from((x(),O).subarray(Number(d)>>>0,Number(m)>>>0)):[],ends:f?Array.from((x(),O).subarray(Number(f)>>>0,Number(b)>>>0)):[],axes:E?Array.from((x(),O).subarray(Number(E)>>>0,Number(z)>>>0)):[]})},1136141:o=>{t.ic("Tile",o,void 0)},1136193:(o,d,m)=>{t.ic("InstanceNormalization",o,{epsilon:d,format:m?"NHWC":"NCHW"})},1136307:(o,d,m)=>{t.ic("InstanceNormalization",o,{epsilon:d,format:m?"NHWC":"NCHW"})},1136421:o=>{t.ic("Range",o,void 0)},1136474:(o,d)=>{t.ic("Einsum",o,{equation:Te(d)})},1136555:(o,d,m,f,b)=>{t.ic("Pad",o,{mode:d,value:m,pads:f?Array.from((x(),O).subarray(Number(f)>>>0,Number(b)>>>0)):[]})},1136698:(o,d,m,f,b,E)=>{t.ic("BatchNormalization",o,{epsilon:d,momentum:m,spatial:!!b,trainingMode:!!f,format:E?"NHWC":"NCHW"})},1136867:(o,d,m,f,b,E)=>{t.ic("BatchNormalization",o,{epsilon:d,momentum:m,spatial:!!b,trainingMode:!!f,format:E?"NHWC":"NCHW"})},1137036:(o,d,m)=>{t.ic("CumSum",o,{exclusive:Number(d),reverse:Number(m)})},1137133:(o,d,m)=>{t.ic("DequantizeLinear",o,{axis:d,blockSize:m})},1137223:(o,d,m,f,b)=>{t.ic("GridSample",o,{align_corners:d,mode:Te(m),padding_mode:Te(f),format:b?"NHWC":"NCHW"})},1137393:(o,d,m,f,b)=>{t.ic("GridSample",o,{align_corners:d,mode:Te(m),padding_mode:Te(f),format:b?"NHWC":"NCHW"})},1137563:(o,d)=>{t.ic("ScatterND",o,{reduction:Te(d)})},1137648:(o,d,m,f,b,E,z,B,q)=>{t.ic("Attention",o,{numHeads:d,isUnidirectional:m,maskFilterValue:f,scale:b,doRotary:E,qkvHiddenSizes:z?Array.from((x(),O).subarray(Number(B)>>>0,Number(B)+z>>>0)):[],pastPresentShareBuffer:!!q})},1137920:o=>{t.ic("BiasAdd",o,void 0)},1137975:o=>{t.ic("BiasSplitGelu",o,void 0)},1138036:o=>{t.ic("FastGelu",o,void 0)},1138092:(o,d,m,f,b,E,z,B,q,G,ae,pe,ge,we,mt,Ti)=>{t.ic("Conv",o,{format:pe?"NHWC":"NCHW",auto_pad:d,dilations:m?Array.from((x(),O).subarray(Number(m)>>>0,Number(f)>>>0)):[],group:b,kernel_shape:E?Array.from((x(),O).subarray(Number(E)>>>0,Number(z)>>>0)):[],pads:B?Array.from((x(),O).subarray(Number(B)>>>0,Number(q)>>>0)):[],strides:G?Array.from((x(),O).subarray(Number(G)>>>0,Number(ae)>>>0)):[],w_is_const:()=>!!(x(),L)[Number(ge)>>>0],activation:Te(we),activation_params:mt?Array.from((x(),Y).subarray(Number(mt)>>>0,Number(Ti)>>>0)):[]})},1138676:o=>{t.ic("Gelu",o,void 0)},1138728:(o,d,m,f,b,E,z,B,q)=>{t.ic("GroupQueryAttention",o,{numHeads:d,kvNumHeads:m,scale:f,softcap:b,doRotary:E,rotaryInterleaved:z,smoothSoftmax:B,localWindowSize:q})},1138945:(o,d,m,f)=>{t.ic("LayerNormalization",o,{axis:d,epsilon:m,simplified:!!f})},1139056:(o,d,m,f)=>{t.ic("LayerNormalization",o,{axis:d,epsilon:m,simplified:!!f})},1139167:(o,d,m,f,b,E)=>{t.ic("MatMulNBits",o,{k:d,n:m,accuracyLevel:f,bits:b,blockSize:E})},1139294:(o,d,m,f,b,E)=>{t.ic("MultiHeadAttention",o,{numHeads:d,isUnidirectional:m,maskFilterValue:f,scale:b,doRotary:E})},1139453:(o,d)=>{t.ic("QuickGelu",o,{alpha:d})},1139517:(o,d,m,f,b)=>{t.ic("RotaryEmbedding",o,{interleaved:!!d,numHeads:m,rotaryEmbeddingDim:f,scale:b})},1139656:(o,d,m)=>{t.ic("SkipLayerNormalization",o,{epsilon:d,simplified:!!m})},1139758:(o,d,m)=>{t.ic("SkipLayerNormalization",o,{epsilon:d,simplified:!!m})},1139860:(o,d,m,f)=>{t.ic("GatherBlockQuantized",o,{gatherAxis:d,quantizeAxis:m,blockSize:f})},1139981:o=>{t.Qd(o)},1140015:(o,d)=>t.Sd(Number(o),Number(d),t.hd.Vd,t.hd.errors)};function vg(o,d,m){return as(async()=>{await t.Od(Number(o),Number(d),Number(m))})}function xg(){return typeof wasmOffsetConverter<"u"}function Sg(o,d,m,f){var b=ue();try{return Vs(o,d,m,f)}catch(E){if(oe(b),E!==E+0)throw E;le(1,0)}}function kg(o,d,m){var f=ue();try{return qs(o,d,m)}catch(b){if(oe(f),b!==b+0)throw b;le(1,0)}}function Tg(o){var d=ue();try{Ps(o)}catch(m){if(oe(d),m!==m+0)throw m;le(1,0)}}function Ig(o,d){var m=ue();try{return Si(o,d)}catch(f){if(oe(m),f!==f+0)throw f;le(1,0)}}function Eg(o,d,m){var f=ue();try{Bs(o,d,m)}catch(b){if(oe(f),b!==b+0)throw b;le(1,0)}}function Cg(o,d,m,f){var b=ue();try{return Ks(o,d,m,f)}catch(E){if(oe(b),E!==E+0)throw E;le(1,0)}}function zg(o,d){var m=ue();try{Gs(o,d)}catch(f){if(oe(m),f!==f+0)throw f;le(1,0)}}function Ag(o,d,m,f,b,E,z){var B=ue();try{return Ws(o,d,m,f,b,E,z)}catch(q){if(oe(B),q!==q+0)throw q;le(1,0)}}function Og(o,d,m,f,b,E){var z=ue();try{Ms(o,d,m,f,b,E)}catch(B){if(oe(z),B!==B+0)throw B;le(1,0)}}function Rg(o,d,m,f){var b=ue();try{Ds(o,d,m,f)}catch(E){if(oe(b),E!==E+0)throw E;le(1,0)}}function Bg(o,d,m,f,b){var E=ue();try{Ls(o,d,m,f,b)}catch(z){if(oe(E),z!==z+0)throw z;le(1,0)}}function Mg(o,d,m,f,b,E,z){var B=ue();try{Fs(o,d,m,f,b,E,z)}catch(q){if(oe(B),q!==q+0)throw q;le(1,0)}}function Ng(o,d,m,f,b,E,z){var B=ue();try{js(o,d,m,f,b,E,z)}catch(q){if(oe(B),q!==q+0)throw q;le(1,0)}}function Dg(o,d,m,f,b,E,z,B){var q=ue();try{Ys(o,d,m,f,b,E,z,B)}catch(G){if(oe(q),G!==G+0)throw G;le(1,0)}}function Ug(o,d,m,f,b){var E=ue();try{return Hs(o,d,m,f,b)}catch(z){if(oe(E),z!==z+0)throw z;le(1,0)}}function Pg(o,d,m){var f=ue();try{return Us(o,d,m)}catch(b){if(oe(f),b!==b+0)throw b;le(1,0)}}function Lg(o,d,m,f,b,E,z,B){var q=ue();try{Js(o,d,m,f,b,E,z,B)}catch(G){if(oe(q),G!==G+0)throw G;le(1,0)}}function qg(o,d,m,f,b,E,z,B,q,G,ae,pe){var ge=ue();try{Zs(o,d,m,f,b,E,z,B,q,G,ae,pe)}catch(we){if(oe(ge),we!==we+0)throw we;le(1,0)}}function Wg(o,d,m){var f=ue();try{return eo(o,d,m)}catch(b){if(oe(f),b!==b+0)throw b;return le(1,0),0n}}function Vg(o,d,m,f,b,E,z,B,q){var G=ue();try{Ns(o,d,m,f,b,E,z,B,q)}catch(ae){if(oe(G),ae!==ae+0)throw ae;le(1,0)}}function Gg(o){var d=ue();try{return to(o)}catch(m){if(oe(d),m!==m+0)throw m;le(1,0)}}function Hg(o,d){var m=ue();try{return yo(o,d)}catch(f){if(oe(m),f!==f+0)throw f;return le(1,0),0n}}function Fg(o,d,m,f){var b=ue();try{return ro(o,d,m,f)}catch(E){if(oe(b),E!==E+0)throw E;le(1,0)}}function jg(o,d,m,f,b,E,z){var B=ue();try{_o(o,d,m,f,b,E,z)}catch(q){if(oe(B),q!==q+0)throw q;le(1,0)}}function Kg(o){var d=ue();try{return io(o)}catch(m){if(oe(d),m!==m+0)throw m;return le(1,0),0n}}function Zg(o,d,m,f,b){var E=ue();try{return lo(o,d,m,f,b)}catch(z){if(oe(E),z!==z+0)throw z;le(1,0)}}function Qg(o,d,m,f,b,E){var z=ue();try{return po(o,d,m,f,b,E)}catch(B){if(oe(z),B!==B+0)throw B;le(1,0)}}function Xg(o,d,m,f,b,E){var z=ue();try{return Qs(o,d,m,f,b,E)}catch(B){if(oe(z),B!==B+0)throw B;le(1,0)}}function Yg(o,d,m,f,b,E){var z=ue();try{return co(o,d,m,f,b,E)}catch(B){if(oe(z),B!==B+0)throw B;le(1,0)}}function Jg(o,d,m,f,b,E,z,B){var q=ue();try{return Xs(o,d,m,f,b,E,z,B)}catch(G){if(oe(q),G!==G+0)throw G;le(1,0)}}function e0(o,d,m,f,b){var E=ue();try{return fo(o,d,m,f,b)}catch(z){if(oe(E),z!==z+0)throw z;return le(1,0),0n}}function t0(o,d,m,f){var b=ue();try{return ho(o,d,m,f)}catch(E){if(oe(b),E!==E+0)throw E;le(1,0)}}function r0(o,d,m,f){var b=ue();try{return mo(o,d,m,f)}catch(E){if(oe(b),E!==E+0)throw E;le(1,0)}}function i0(o,d,m,f,b,E,z,B,q,G,ae,pe){var ge=ue();try{return go(o,d,m,f,b,E,z,B,q,G,ae,pe)}catch(we){if(oe(ge),we!==we+0)throw we;le(1,0)}}function n0(o,d,m,f,b,E,z,B,q,G,ae){var pe=ue();try{oo(o,d,m,f,b,E,z,B,q,G,ae)}catch(ge){if(oe(pe),ge!==ge+0)throw ge;le(1,0)}}function a0(o,d,m,f,b,E,z,B,q,G,ae,pe,ge,we,mt,Ti){var l0=ue();try{uo(o,d,m,f,b,E,z,B,q,G,ae,pe,ge,we,mt,Ti)}catch(Ii){if(oe(l0),Ii!==Ii+0)throw Ii;le(1,0)}}function s0(o,d,m){var f=ue();try{return no(o,d,m)}catch(b){if(oe(f),b!==b+0)throw b;le(1,0)}}function o0(o,d,m){var f=ue();try{return ao(o,d,m)}catch(b){if(oe(f),b!==b+0)throw b;le(1,0)}}function u0(o,d,m,f){var b=ue();try{so(o,d,m,f)}catch(E){if(oe(b),E!==E+0)throw E;le(1,0)}}function zr(){if(0<Ye)$e=zr;else if(n)v?.(t),F();else{for(var o=ke;0<o.length;)o.shift()(t);0<Ye?$e=zr:(t.calledRun=!0,C||(F(),v?.(t)))}}return n||(at=await Ve(),zr()),t.PTR_SIZE=4,U?t:new Promise((o,d)=>{v=o,S=d})}var Ap,So,A0=D(()=>{"use strict";Ap=xo,So=globalThis.self?.name?.startsWith("em-pthread"),So&&xo()}),Mi,Rn,ko,Me,Op,Or,To,Io,Ni,Eo,Di,Rp,Ui,Bp,ea=D(()=>{"use strict";Jn(),Mi=typeof location>"u"?void 0:location.origin,Rn=import.meta.url>"file:"&&import.meta.url<"file;",ko=()=>{if(Rn){let e=URL;return new URL(new e("ort.bundle.min.mjs",import.meta.url).href,Mi).href}return import.meta.url},Me=ko(),Op=()=>{if(Me&&!Me.startsWith("blob:"))return Me.substring(0,Me.lastIndexOf("/")+1)},Or=(e,t)=>{try{let r=t??Me;return(r?new URL(e,r):new URL(e)).origin===Mi}catch{return!1}},To=(e,t)=>{let r=t??Me;try{return(r?new URL(e,r):new URL(e)).href}catch{return}},Io=(e,t)=>`${t??"./"}${e}`,Ni=async e=>{let t=await(await fetch(e,{credentials:"same-origin"})).blob();return URL.createObjectURL(t)},Eo=async e=>(await import(e)).default,Di=(z0(),yr(Ep)).default,Rp=async()=>{if(!Me)throw new Error("Failed to load proxy worker: cannot determine the script source URL.");if(Or(Me))return[void 0,Di()];let e=await Ni(Me);return[e,Di(e)]},Ui=(A0(),yr(zp)).default,Bp=async(e,t,r,i)=>{let n=Ui&&!(e||t);if(n)if(Me)n=Or(Me)||i&&!r;else if(i&&!r)n=!0;else throw new Error("cannot determine the script source URL.");if(n)return[void 0,Ui];{let a="ort-wasm-simd-threaded.jsep.mjs",s=e??To(a,t),u=r&&s&&!Or(s,t),l=u?await Ni(s):s??Io(a,t);return[u?l:void 0,await Eo(l)]}}}),Pi,Rr,tr,Li,Co,zo,Ao,ta,me,Ut=D(()=>{"use strict";ea(),Rr=!1,tr=!1,Li=!1,Co=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},zo=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},Ao=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,19,1,17,0,65,1,253,15,65,2,253,15,65,3,253,15,253,147,2,11]))}catch{return!1}},ta=async e=>{if(Rr)return Promise.resolve();if(tr)throw new Error("multiple calls to 'initializeWebAssembly()' detected.");if(Li)throw new Error("previous call to 'initializeWebAssembly()' failed.");tr=!0;let t=e.initTimeout,r=e.numThreads;if(e.simd!==!1){if(e.simd==="relaxed"){if(!Ao())throw new Error("Relaxed WebAssembly SIMD is not supported in the current environment.")}else if(!zo())throw new Error("WebAssembly SIMD is not supported in the current environment.")}let i=Co();r>1&&!i&&(typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+r+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),e.numThreads=r=1);let n=e.wasmPaths,a=typeof n=="string"?n:void 0,s=n?.mjs,u=s?.href??s,l=n?.wasm,p=l?.href??l,c=e.wasmBinary,[h,g]=await Bp(u,a,r>1,!!c||!!p),_=!1,y=[];if(t>0&&y.push(new Promise(v=>{setTimeout(()=>{_=!0,v()},t)})),y.push(new Promise((v,S)=>{let $={numThreads:r};if(c)$.wasmBinary=c,$.locateFile=w=>w;else if(p||a)$.locateFile=w=>p??a+w;else if(u&&u.indexOf("blob:")!==0)$.locateFile=w=>new URL(w,u).href;else if(h){let w=Op();w&&($.locateFile=T=>w+T)}g($).then(w=>{tr=!1,Rr=!0,Pi=w,v(),h&&URL.revokeObjectURL(h)},w=>{tr=!1,Li=!0,S(w)})})),await Promise.race(y),_)throw new Error(`WebAssembly backend initializing failed due to timeout: ${t}ms`)},me=()=>{if(Rr&&Pi)return Pi;throw new Error("WebAssembly is not initialized yet.")}}),Qe,Qr,fe,ra=D(()=>{"use strict";Ut(),Qe=(e,t)=>{let r=me(),i=r.lengthBytesUTF8(e)+1,n=r._malloc(i);return r.stringToUTF8(e,n,i),t.push(n),n},Qr=(e,t,r,i)=>{if(typeof e=="object"&&e!==null){if(r.has(e))throw new Error("Circular reference in options");r.add(e)}Object.entries(e).forEach(([n,a])=>{let s=t?t+n:n;if(typeof a=="object")Qr(a,s+".",r,i);else if(typeof a=="string"||typeof a=="number")i(s,a.toString());else if(typeof a=="boolean")i(s,a?"1":"0");else throw new Error(`Can't handle extra config type: ${typeof a}`)})},fe=e=>{let t=me(),r=t.stackSave();try{let i=t.PTR_SIZE,n=t.stackAlloc(2*i);t._OrtGetLastError(n,n+i);let a=Number(t.getValue(n,i===4?"i32":"i64")),s=t.getValue(n+i,"*"),u=s?t.UTF8ToString(s):"";throw new Error(`${e} ERROR_CODE: ${a}, ERROR_MESSAGE: ${u}`)}finally{t.stackRestore(r)}}}),Mp,O0=D(()=>{"use strict";Ut(),ra(),Mp=(e,t)=>{let r=me(),i=0,n=[],a=e||{};try{if(e?.logSeverityLevel===void 0)a.logSeverityLevel=2;else if(typeof e.logSeverityLevel!="number"||!Number.isInteger(e.logSeverityLevel)||e.logSeverityLevel<0||e.logSeverityLevel>4)throw new Error(`log severity level is not valid: ${e.logSeverityLevel}`);if(e?.logVerbosityLevel===void 0)a.logVerbosityLevel=0;else if(typeof e.logVerbosityLevel!="number"||!Number.isInteger(e.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${e.logVerbosityLevel}`);e?.terminate===void 0&&(a.terminate=!1);let s=0;e?.tag!==void 0&&(s=Qe(e.tag,n)),i=r._OrtCreateRunOptions(a.logSeverityLevel,a.logVerbosityLevel,!!a.terminate,s),i===0&&fe("Can't create run options."),e?.extra!==void 0&&Qr(e.extra,"",new WeakSet,(u,l)=>{let p=Qe(u,n),c=Qe(l,n);r._OrtAddRunConfigEntry(i,p,c)!==0&&fe(`Can't set a run config entry: ${u} - ${l}.`)});for(let u of t)r._OrtRunOptionsAddActiveLoraAdapter(i,u)!==0&&fe("Can't add an active LoRA adapter.");return[i,n]}catch(s){throw i!==0&&r._OrtReleaseRunOptions(i),n.forEach(u=>r._free(u)),s}}}),Oo,Ro,Bo,St,Mo,Np,R0=D(()=>{"use strict";Ut(),ra(),Oo=e=>{switch(e){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"layout":return 3;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${e}`)}},Ro=e=>{switch(e){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${e}`)}},Bo=e=>{e.extra||(e.extra={}),e.extra.session||(e.extra.session={});let t=e.extra.session;t.use_ort_model_bytes_directly||(t.use_ort_model_bytes_directly="1"),e.executionProviders&&e.executionProviders.some(r=>(typeof r=="string"?r:r.name)==="webgpu")&&(e.enableMemPattern=!1)},St=(e,t,r,i)=>{let n=Qe(t,i),a=Qe(r,i);me()._OrtAddSessionConfigEntry(e,n,a)!==0&&fe(`Can't set a session config entry: ${t} - ${r}.`)},Mo=async(e,t,r)=>{let i=t.executionProviders;for(let n of i){let a=typeof n=="string"?n:n.name,s=[],u;switch(a){case"webnn":if(a="WEBNN",St(e,"session.disable_quant_qdq","1",r),St(e,"session.disable_qdq_constant_folding","1",r),typeof n!="string"){let g=n?.deviceType;g&&St(e,"deviceType",g,r)}break;case"webgpu":if(a="JS",typeof n!="string"){let g=n;if(g?.preferredLayout){if(g.preferredLayout!=="NCHW"&&g.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${g.preferredLayout}`);St(e,"preferredLayout",g.preferredLayout,r)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${a}`)}let l=s.length,p=0,c=0;if(l>0){p=me()._malloc(l*me().PTR_SIZE),r.push(p),c=me()._malloc(l*me().PTR_SIZE),r.push(c);for(let g=0;g<l;g++)me().setValue(p+g*me().PTR_SIZE,s[g][0],"*"),me().setValue(c+g*me().PTR_SIZE,s[g][1],"*")}let h;if(u===void 0){let g=Qe(a,r);h=await me()._OrtAppendExecutionProvider(e,g,p,c,l)}h!==0&&fe(`Can't append execution provider: ${a}.`)}},Np=async e=>{let t=me(),r=0,i=[],n=e||{};Bo(n);try{let a=Oo(n.graphOptimizationLevel??"all"),s=Ro(n.executionMode??"sequential"),u=typeof n.logId=="string"?Qe(n.logId,i):0,l=n.logSeverityLevel??2;if(!Number.isInteger(l)||l<0||l>4)throw new Error(`log severity level is not valid: ${l}`);let p=n.logVerbosityLevel??0;if(!Number.isInteger(p)||p<0||p>4)throw new Error(`log verbosity level is not valid: ${p}`);let c=typeof n.optimizedModelFilePath=="string"?Qe(n.optimizedModelFilePath,i):0;if(r=t._OrtCreateSessionOptions(a,!!n.enableCpuMemArena,!!n.enableMemPattern,s,!!n.enableProfiling,0,u,l,p,c),r===0&&fe("Can't create session options."),n.executionProviders&&await Mo(r,n,i),n.enableGraphCapture!==void 0){if(typeof n.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${n.enableGraphCapture}`);St(r,"enableGraphCapture",n.enableGraphCapture.toString(),i)}if(n.freeDimensionOverrides)for(let[h,g]of Object.entries(n.freeDimensionOverrides)){if(typeof h!="string")throw new Error(`free dimension override name must be a string: ${h}`);if(typeof g!="number"||!Number.isInteger(g)||g<0)throw new Error(`free dimension override value must be a non-negative integer: ${g}`);let _=Qe(h,i);t._OrtAddFreeDimensionOverride(r,_,g)!==0&&fe(`Can't set a free dimension override: ${h} - ${g}.`)}return n.extra!==void 0&&Qr(n.extra,"",new WeakSet,(h,g)=>{St(r,h,g,i)}),[r,i]}catch(a){throw r!==0&&t._OrtReleaseSessionOptions(r)!==0&&fe("Can't release session options."),i.forEach(s=>t._free(s)),a}}}),At,lt,Ot,ii,Xr,ia,na,Bn,ee=D(()=>{"use strict";At=e=>{switch(e){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw new Error(`unsupported data type: ${e}`)}},lt=e=>{switch(e){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw new Error(`unsupported data type: ${e}`)}},Ot=(e,t)=>{let r=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][e],i=typeof t=="number"?t:t.reduce((n,a)=>n*a,1);return r>0?Math.ceil(i*r):void 0},ii=e=>{switch(e){case"float16":return typeof Float16Array<"u"?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${e}`)}},Xr=e=>{switch(e){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${e}`)}},ia=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",na=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint64"||e==="int8"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",Bn=e=>{switch(e){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw new Error(`unsupported data location: ${e}`)}}}),ni,aa=D(()=>{"use strict";Jn(),ni=async e=>{if(typeof e=="string"){let t=await fetch(e);if(!t.ok)throw new Error(`failed to load external data file: ${e}`);let r=t.headers.get("Content-Length"),i=r?parseInt(r,10):0;if(i<1073741824)return new Uint8Array(await t.arrayBuffer());{if(!t.body)throw new Error(`failed to load external data file: ${e}, no response body.`);let n=t.body.getReader(),a;try{a=new ArrayBuffer(i)}catch(u){if(u instanceof RangeError){let l=Math.ceil(i/65536);a=new WebAssembly.Memory({initial:l,maximum:l}).buffer}else throw u}let s=0;for(;;){let{done:u,value:l}=await n.read();if(u)break;let p=l.byteLength;new Uint8Array(a,s,p).set(l),s+=p}return new Uint8Array(a,0,i)}}else return e instanceof Blob?new Uint8Array(await e.arrayBuffer()):e instanceof Uint8Array?e:new Uint8Array(e)}}),No,Do,Uo,Po,sa,Lo,de,dt=D(()=>{"use strict";ee(),No=["V","I","W","E","F"],Do=(e,t)=>{console.log(`[${No[e]},${new Date().toISOString()}]${t}`)},sa=(e,t)=>{Uo=e,Po=t},Lo=(e,t)=>{let r=Xr(e),i=Xr(Uo);r>=i&&Do(r,typeof t=="function"?t():t)},de=(...e)=>{Po&&Lo(...e)}}),qo,jt,R,Yr,Dp,Up,Pp,re=D(()=>{"use strict";qo=class{static calcMatMulShape(e,t){return e[1]!==t[0]?void 0:[e[0],t[1]]}},jt=class{static calcShape(e,t,r=!1){let i=e.length,n=t.length;if(i===0)return t;if(n===0)return e;let a=Math.max(e.length,t.length),s=new Array(a);if(r){if(i<2||n<2)return;let u=qo.calcMatMulShape([e[i-2],e[i-1]],[t[n-2],t[n-1]]);if(u===void 0)return;[s[a-2],s[a-1]]=u}for(let u=r?3:1;u<=a;u++){let l=i-u<0?1:e[i-u],p=n-u<0?1:t[n-u];if(l!==p&&l>1&&p>1)return;let c=Math.max(l,p);if(l&&p)s[a-u]=Math.max(l,p);else{if(c>1)return;s[a-u]=0}}return s}static isValidBroadcast(e,t){let r=e.length,i=t.length;if(r>i)return!1;for(let n=1;n<=r;n++)if(e[r-n]!==1&&e[r-n]!==t[i-n])return!1;return!0}},R=class Fr{static size(t){return Fr.getSizeFromDimensionRange(t,0,t.length)}static convertShape(t,r=4){let i=t.length;if(i===0)return[];let n=new Array(i),a=i-1;for(;a>=0;){if(t[a]%r===0){n[a]=t[a]/r;break}if(r%t[a]!==0)throw new Error("cannot convert shape");n[a]=1,r/=t[a],a--}for(a--;a>=0;a--)n[a]=t[a];return n}static sizeFromDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeFromDimension as Tensor has ${t.length} dimensions.`);return Fr.getSizeFromDimensionRange(t,r,t.length)}static sizeToDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeToDimension as Tensor has ${t.length} dimensions.`);return Fr.getSizeFromDimensionRange(t,0,r)}static getSizeFromDimensionRange(t,r,i){let n=1;for(let a=r;a<i;a++){if(t[a]<0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");n*=Number(t[a])}return n}static computeStrides(t){let r=t.length;if(r===0)return[];if(r===1)return[1];let i=new Array(r);i[r-1]=1,i[r-2]=t[r-1];for(let n=r-3;n>=0;--n)i[n]=i[n+1]*t[n+1];return i}static normalizeAxis(t,r){if(t<-r&&t>=r)throw new Error("unsupported axis for this operation.");return t<0?t+r:t}static normalizeAxes(t,r){return t.map(i=>this.normalizeAxis(i,r??t.length))}static sortBasedOnPerm(t,r){return r?r.map(i=>t[i]):t.slice().reverse()}static padShape(t,r){let i=t.length;return t.map((n,a)=>n+r[a]+r[a+i])}static areEqual(t,r){return t.length!==r.length?!1:t.every((i,n)=>i===r[n])}},Yr=class _t{static adjustPoolAttributes(t,r,i,n,a,s){if(!t&&i.length!==r.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(t)for(let u=0;u<r.length-2;u++)u>=i.length?i.push(r[u+2]):i[u]=r[u+2];for(let u=0;u<i.length;u++)if(u<n.length){if(n[u]<0)throw new Error("strides should be greater than or equal to 1")}else n.push(1);for(let u=0;u<i.length;u++)if(u<a.length){if(a[u]<0)throw new Error("dilations should be greater than or equal to 1")}else a.push(1);for(let u=0;u<i.length*2;u++)if(u<s.length){if(s[u]<0)throw new Error("pad should be greater than or equal to 1")}else s.push(0);for(let u=0;u<i.length;u++){if(i[u]<=0)throw new Error("kernel shapes need to be greater than 0");if(s[u]>=i[u]||s[u+i.length]>=i[u])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(t,r,i,n,a,s,u){if(u){if(a.length!==2*(t.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(r.length!==t.length-2)throw new Error("length of strides should be the length of data dimensions");if(n.length!==t.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let l=0;l<t.length-2;l++)_t.adjustPadAndReturnShape(t[l+(s?1:2)],r[l],i[l],n[l],a,l,l+t.length-2,u)}}static computePoolOutputShape(t,r,i,n,a,s,u,l=0){if(r.length<=0)throw new Error("input shape must be of size greater than 0");let p=[r[0],r[1]];return _t.computeShapeHelper(t,r,p,i,n,a,s,u,l),p}static computeConvOutputShape(t,r,i,n,a,s,u){if(t.length<=0||r.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let l=[t[0],r[0]];return _t.computeShapeHelper(!1,t,l,i,n,a,s,u),l}static computeShapeHelper(t,r,i,n,a,s,u,l,p=0){if(t)for(let c=0;c<r.length-2;c++)i.push(1);else for(let c=0;c<r.length-2;c++)i.push(_t.adjustPadAndReturnShape(r[c+2],n[c],a[c],s[c],u,c,c+r.length-2,l,p))}static computeOutputSize(t,r,i,n,a){let s=Math.floor(t/r)+1;return a===1&&(s=Math.ceil(t/r)+1,(s-1)*r>=i+n&&(s-=1)),s}static adjustPadAndReturnShape(t,r,i,n,a,s,u,l,p=0){let c=i*(n-1)+1;if(l&&l!=="NOTSET")switch(l){case"VALID":return a[s]=0,a[u]=0,_t.computeOutputSize(t-c,r,t,0,p);case"SAME_LOWER":case"SAME_UPPER":if(i!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let h=(Math.floor((t+r-1)/r)-1)*r+n-t;return a[s]=Math.floor(l==="SAME_LOWER"?(h+1)/2:h/2),a[u]=h-a[s],_t.computeOutputSize(t+a[s]+a[u]-c,r,t,a[s],p)}default:throw new Error("Unsupported AutoPad type")}else return _t.computeOutputSize(t+a[s]+a[u]-c,r,t,a[s],p)}},Dp=class{static getShapeOfGemmResult(e,t,r,i,n){if(e.length!==2||r.length!==2)throw new Error("shape need to be of size 2");let a,s,u;t?(a=e[1],s=e[0]):(a=e[0],s=e[1]);let l=-1;if(i?(u=r[0],l=1):(u=r[1],l=0),r[l]!==s)throw new Error("dimension mismatch");if(a<=0||u<=0||s<=0)throw new Error("invalid shape specified");if(n&&!jt.isValidBroadcast(n,[a,u]))throw new Error("gemm: invalid bias shape for broadcast");return[a,u,s]}},Up=-34028234663852886e22,Pp=34028234663852886e22}),oa,Lp=D(()=>{"use strict";ee(),oa=(e,t)=>new(ii(t))(e)}),qi,Wo,Wi,Vo,Vi,Go,Gi,Hi,Fi,Ho,qp,B0=D(()=>{"use strict";ee(),dt(),qi=new Map([["float32",32],["float16",16],["int32",32],["uint32",32],["int64",64],["uint64",64],["int8",8],["uint8",8],["int4",4],["uint4",4]]),Wo=(e,t)=>{if(t==="int32")return e;let r=qi.get(t);if(!r)throw new Error(`WebNN backend does not support data type: ${t}`);let i=r/8;if(e.byteLength%i!==0)throw new Error(`Invalid Uint8Array length - must be a multiple of ${i}.`);let n=e.byteLength/i,a=new(ii(t))(e.buffer,e.byteOffset,n);switch(t){case"int64":case"uint64":{let s=new Int32Array(n);for(let u=0;u<n;u++){let l=a[u];if(l>2147483647n||l<-2147483648n)throw new Error("Can not convert int64 data to int32 - value out of range.");s[u]=Number(l)}return new Uint8Array(s.buffer)}case"int8":case"uint8":case"uint32":{if(t==="uint32"&&a.some(u=>u>2147483647))throw new Error("Can not convert uint32 data to int32 - value out of range.");let s=Int32Array.from(a,Number);return new Uint8Array(s.buffer)}default:throw new Error(`Unsupported data conversion from ${t} to 'int32'`)}},Wi=(e,t)=>{if(t==="int32")return e;if(e.byteLength%4!==0)throw new Error("Invalid Uint8Array length - must be a multiple of 4 (int32).");let r=e.byteLength/4,i=new Int32Array(e.buffer,e.byteOffset,r);switch(t){case"int64":{let n=BigInt64Array.from(i,BigInt);return new Uint8Array(n.buffer)}case"uint64":{if(i.some(a=>a<0))throw new Error("Can not convert int32 data to uin64 - negative value found.");let n=BigUint64Array.from(i,BigInt);return new Uint8Array(n.buffer)}case"int8":{if(i.some(a=>a<-128||a>127))throw new Error("Can not convert int32 data to int8 - value out of range.");let n=Int8Array.from(i,Number);return new Uint8Array(n.buffer)}case"uint8":{if(i.some(n=>n<0||n>255))throw new Error("Can not convert int32 data to uint8 - value out of range.");return Uint8Array.from(i,Number)}case"uint32":{if(i.some(a=>a<0))throw new Error("Can not convert int32 data to uint32 - negative value found.");let n=Uint32Array.from(i,Number);return new Uint8Array(n.buffer)}default:throw new Error(`Unsupported data conversion from 'int32' to ${t}`)}},Vo=1,Vi=()=>Vo++,Go=new Map([["int8","int32"],["uint8","int32"],["uint32","int32"],["int64","int32"]]),Gi=(e,t)=>{let r=qi.get(e);if(!r)throw new Error(`WebNN backend does not support data type: ${e}`);return t.length>0?Math.ceil(t.reduce((i,n)=>i*n)*r/8):0},Hi=class{constructor(e){this.isDataConverted=!1;let{sessionId:t,context:r,tensor:i,dataType:n,shape:a,fallbackDataType:s}=e;this.sessionId=t,this.mlContext=r,this.mlTensor=i,this.dataType=n,this.tensorShape=a,this.fallbackDataType=s}get tensor(){return this.mlTensor}get type(){return this.dataType}get fallbackType(){return this.fallbackDataType}get shape(){return this.tensorShape}get byteLength(){return Gi(this.dataType,this.tensorShape)}destroy(){de("verbose",()=>"[WebNN] TensorWrapper.destroy"),this.mlTensor.destroy()}write(e){this.mlContext.writeTensor(this.mlTensor,e)}async read(e){if(this.fallbackDataType){let t=await this.mlContext.readTensor(this.mlTensor),r=Wi(new Uint8Array(t),this.dataType);if(e){(e instanceof ArrayBuffer?new Uint8Array(e):new Uint8Array(e.buffer,e.byteOffset,e.byteLength)).set(r);return}else return new Uint8Array(r).buffer}else return e?this.mlContext.readTensor(this.mlTensor,e):this.mlContext.readTensor(this.mlTensor)}canReuseTensor(e,t,r){return this.mlContext===e&&this.dataType===t&&this.tensorShape.length===r.length&&this.tensorShape.every((i,n)=>i===r[n])}setIsDataConverted(e){this.isDataConverted=e}},Fi=class{constructor(e,t){this.tensorManager=e,this.wrapper=t}get tensorWrapper(){return this.wrapper}releaseTensor(){this.tensorWrapper&&(this.tensorManager.releaseTensor(this.tensorWrapper),this.wrapper=void 0)}async ensureTensor(e,t,r,i){let n=this.tensorManager.getMLContext(e),a=this.tensorManager.getMLOpSupportLimits(e),s;if(!a?.input.dataTypes.includes(t)){if(s=Go.get(t),!s||!a?.input.dataTypes.includes(s))throw new Error(`WebNN backend does not support data type: ${t}`);de("verbose",()=>`[WebNN] TensorIdTracker.ensureTensor: fallback dataType from ${t} to ${s}`)}if(this.wrapper){if(this.wrapper.canReuseTensor(n,t,r))return this.wrapper.tensor;if(i){if(this.wrapper.byteLength!==Gi(t,r))throw new Error("Unable to copy data to tensor with different size.");this.activeUpload=new Uint8Array(await this.wrapper.read())}this.tensorManager.releaseTensor(this.wrapper)}let u=typeof MLTensorUsage>"u"?void 0:MLTensorUsage.READ|MLTensorUsage.WRITE;return this.wrapper=await this.tensorManager.getCachedTensor(e,t,r,u,!0,!0,s),i&&this.activeUpload&&(this.wrapper.write(this.activeUpload),this.activeUpload=void 0),this.wrapper.tensor}upload(e){let t=e;if(this.wrapper){if(this.wrapper.fallbackType)if(this.wrapper.fallbackType==="int32")t=Wo(e,this.wrapper.type),this.wrapper.setIsDataConverted(!0);else throw new Error(`Unsupported fallback data type: ${this.wrapper.fallbackType}`);if(e.byteLength===this.wrapper.byteLength){this.wrapper.write(t);return}else de("verbose",()=>"Data size does not match tensor size. Releasing tensor."),this.releaseTensor()}this.activeUpload?this.activeUpload.set(t):this.activeUpload=new Uint8Array(t)}async download(e){if(this.activeUpload){let t=this.wrapper?.isDataConverted?Wi(this.activeUpload,this.wrapper?.type):this.activeUpload;if(e){e instanceof ArrayBuffer?new Uint8Array(e).set(t):new Uint8Array(e.buffer,e.byteOffset,e.byteLength).set(t);return}else return t.buffer}if(!this.wrapper)throw new Error("Tensor has not been created.");return e?this.wrapper.read(e):this.wrapper.read()}},Ho=class{constructor(e){this.backend=e,this.tensorTrackersById=new Map,this.freeTensors=[],this.externalTensors=new Set}getMLContext(e){let t=this.backend.getMLContext(e);if(!t)throw new Error("MLContext not found for session.");return t}getMLOpSupportLimits(e){return this.backend.getMLOpSupportLimits(e)}reserveTensorId(){let e=Vi();return this.tensorTrackersById.set(e,new Fi(this)),e}releaseTensorId(e){let t=this.tensorTrackersById.get(e);t&&(this.tensorTrackersById.delete(e),t.tensorWrapper&&this.releaseTensor(t.tensorWrapper))}async ensureTensor(e,t,r,i,n){de("verbose",()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${t}, dataType: ${r}, shape: ${i}, copyOld: ${n}}`);let a=this.tensorTrackersById.get(t);if(!a)throw new Error("Tensor not found.");return a.ensureTensor(e,r,i,n)}upload(e,t){let r=this.tensorTrackersById.get(e);if(!r)throw new Error("Tensor not found.");r.upload(t)}async download(e,t){de("verbose",()=>`[WebNN] TensorManager.download {tensorId: ${e}, dstBuffer: ${t?.byteLength}}`);let r=this.tensorTrackersById.get(e);if(!r)throw new Error("Tensor not found.");return r.download(t)}releaseTensorsForSession(e){for(let t of this.freeTensors)t.sessionId===e&&t.destroy();this.freeTensors=this.freeTensors.filter(t=>t.sessionId!==e)}registerTensor(e,t,r,i){let n=this.getMLContext(e),a=Vi(),s=new Hi({sessionId:e,context:n,tensor:t,dataType:r,shape:i});return this.tensorTrackersById.set(a,new Fi(this,s)),this.externalTensors.add(s),a}async getCachedTensor(e,t,r,i,n,a,s){let u=this.getMLContext(e);for(let[p,c]of this.freeTensors.entries())if(c.canReuseTensor(u,t,r)){de("verbose",()=>`[WebNN] Reusing tensor {dataType: ${t}, ${s?`fallbackDataType: ${s},`:""} shape: ${r}`);let h=this.freeTensors.splice(p,1)[0];return h.sessionId=e,h}de("verbose",()=>`[WebNN] MLContext.createTensor {dataType: ${t}, ${s?`fallbackDataType: ${s},`:""} shape: ${r}}`);let l=await u.createTensor({dataType:s??t,shape:r,dimensions:r,usage:i,writable:n,readable:a});return new Hi({sessionId:e,context:u,tensor:l,dataType:t,shape:r,fallbackDataType:s})}releaseTensor(e){this.externalTensors.has(e)&&this.externalTensors.delete(e),this.freeTensors.push(e)}},qp=(...e)=>new Ho(...e)}),rr,Fo,Wp,M0=D(()=>{"use strict";ee(),Ut(),Lp(),B0(),dt(),rr=new Map([[1,"float32"],[10,"float16"],[6,"int32"],[12,"uint32"],[7,"int64"],[13,"uint64"],[22,"int4"],[21,"uint4"],[3,"int8"],[2,"uint8"],[9,"uint8"]]),Fo=(e,t)=>{if(e===t)return!0;if(e===void 0||t===void 0)return!1;let r=Object.keys(e).sort(),i=Object.keys(t).sort();return r.length===i.length&&r.every((n,a)=>n===i[a]&&e[n]===t[n])},Wp=class{constructor(e){this.tensorManager=qp(this),this.mlContextBySessionId=new Map,this.sessionIdsByMLContext=new Map,this.mlContextCache=[],this.sessionGraphInputs=new Map,this.sessionGraphOutputs=new Map,this.temporaryGraphInputs=[],this.temporaryGraphOutputs=[],this.temporarySessionTensorIds=new Map,this.mlOpSupportLimitsBySessionId=new Map,sa(e.logLevel,!!e.debug)}get currentSessionId(){if(this.activeSessionId===void 0)throw new Error("No active session");return this.activeSessionId}onRunStart(e){de("verbose",()=>`[WebNN] onRunStart {sessionId: ${e}}`),this.activeSessionId=e}onRunEnd(e){de("verbose",()=>`[WebNN] onRunEnd {sessionId: ${e}}`);let t=this.temporarySessionTensorIds.get(e);if(t){for(let r of t)de("verbose",()=>`[WebNN] releasing temporary tensor {tensorId: ${r}}`),this.tensorManager.releaseTensorId(r);this.temporarySessionTensorIds.delete(e),this.activeSessionId=void 0}}async createMLContext(e){if(e instanceof GPUDevice){let r=this.mlContextCache.findIndex(i=>i.gpuDevice===e);if(r!==-1)return this.mlContextCache[r].mlContext;{let i=await navigator.ml.createContext(e);return this.mlContextCache.push({gpuDevice:e,mlContext:i}),i}}else if(e===void 0){let r=this.mlContextCache.findIndex(i=>i.options===void 0&&i.gpuDevice===void 0);if(r!==-1)return this.mlContextCache[r].mlContext;{let i=await navigator.ml.createContext();return this.mlContextCache.push({mlContext:i}),i}}let t=this.mlContextCache.findIndex(r=>Fo(r.options,e));if(t!==-1)return this.mlContextCache[t].mlContext;{let r=await navigator.ml.createContext(e);return this.mlContextCache.push({options:e,mlContext:r}),r}}registerMLContext(e,t){this.mlContextBySessionId.set(e,t);let r=this.sessionIdsByMLContext.get(t);r||(r=new Set,this.sessionIdsByMLContext.set(t,r)),r.add(e),this.mlOpSupportLimitsBySessionId.has(e)||this.mlOpSupportLimitsBySessionId.set(e,t.opSupportLimits()),this.temporaryGraphInputs.length>0&&(this.sessionGraphInputs.set(e,this.temporaryGraphInputs),this.temporaryGraphInputs=[]),this.temporaryGraphOutputs.length>0&&(this.sessionGraphOutputs.set(e,this.temporaryGraphOutputs),this.temporaryGraphOutputs=[])}onReleaseSession(e){this.sessionGraphInputs.delete(e),this.sessionGraphOutputs.delete(e);let t=this.mlContextBySessionId.get(e);if(!t)return;this.tensorManager.releaseTensorsForSession(e),this.mlContextBySessionId.delete(e),this.mlOpSupportLimitsBySessionId.delete(e);let r=this.sessionIdsByMLContext.get(t);if(r.delete(e),r.size===0){this.sessionIdsByMLContext.delete(t);let i=this.mlContextCache.findIndex(n=>n.mlContext===t);i!==-1&&this.mlContextCache.splice(i,1)}}getMLContext(e){return this.mlContextBySessionId.get(e)}getMLOpSupportLimits(e){return this.mlOpSupportLimitsBySessionId.get(e)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(e){de("verbose",()=>`[WebNN] releaseTensorId {tensorId: ${e}}`),this.tensorManager.releaseTensorId(e)}async ensureTensor(e,t,r,i,n){let a=rr.get(r);if(!a)throw new Error(`Unsupported ONNX data type: ${r}`);return this.tensorManager.ensureTensor(e??this.currentSessionId,t,a,i,n)}async createTemporaryTensor(e,t,r){de("verbose",()=>`[WebNN] createTemporaryTensor {onnxDataType: ${t}, shape: ${r}}`);let i=rr.get(t);if(!i)throw new Error(`Unsupported ONNX data type: ${t}`);let n=this.tensorManager.reserveTensorId();await this.tensorManager.ensureTensor(e,n,i,r,!1);let a=this.temporarySessionTensorIds.get(e);return a?a.push(n):this.temporarySessionTensorIds.set(e,[n]),n}uploadTensor(e,t){if(!me().shouldTransferToMLTensor)throw new Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");de("verbose",()=>`[WebNN] uploadTensor {tensorId: ${e}, data: ${t.byteLength}}`),this.tensorManager.upload(e,t)}async downloadTensor(e,t){return this.tensorManager.download(e,t)}createMLTensorDownloader(e,t){return async()=>{let r=await this.tensorManager.download(e);return oa(r,t)}}registerMLTensor(e,t,r,i){let n=rr.get(r);if(!n)throw new Error(`Unsupported ONNX data type: ${r}`);let a=this.tensorManager.registerTensor(e,t,n,i);return de("verbose",()=>`[WebNN] registerMLTensor {tensor: ${t}, dataType: ${n}, dimensions: ${i}} -> {tensorId: ${a}}`),a}registerGraphInput(e){this.temporaryGraphInputs.push(e)}registerGraphOutput(e){this.temporaryGraphOutputs.push(e)}isGraphInput(e,t){let r=this.sessionGraphInputs.get(e);return r?r.includes(t):!1}isGraphOutput(e,t){let r=this.sessionGraphOutputs.get(e);return r?r.includes(t):!1}isGraphInputOutputTypeSupported(e,t,r=!0){let i=rr.get(At(t)),n=this.mlOpSupportLimitsBySessionId.get(e);return typeof i>"u"?!1:r?!!n?.input.dataTypes.includes(i):!!n?.output.dataTypes.includes(i)}flush(){}}}),ua=D(()=>{"use strict"}),ji,Br,Mr,jo,Ko,Ki,Mn,Zo,Vp,N0=D(()=>{"use strict";dt(),ua(),ji=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[12582912,10],[16777216,10],[26214400,15],[33554432,22],[44236800,2],[58982400,6],[67108864,6],[134217728,6],[167772160,6]]),Br=[],Mr=e=>Math.ceil(Number(e)/16)*16,jo=e=>{for(let t=0;t<Br.length;t++){let r=Br[t];if(e<=r)return r}return Math.ceil(e/16)*16},Ko=1,Ki=()=>Ko++,Mn=async(e,t,r,i)=>{let n=Mr(r),a=e.device.createBuffer({size:n,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let s=e.getCommandEncoder();e.endComputePass(),s.copyBufferToBuffer(t,0,a,0,n),e.flush(),await a.mapAsync(GPUMapMode.READ);let u=a.getMappedRange();if(i){let l=i();return l.set(new Uint8Array(u,0,r)),l}else return new Uint8Array(u.slice(0,r))}finally{a.destroy()}},Zo=class{constructor(e){this.backend=e,this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersPending=[],this.capturedPendingBuffers=new Map;for(let[t]of ji)Br.push(t),this.freeBuffers.set(t,[]),this.freeUniformBuffers.set(t,[]);this.sessionCount=0}upload(e,t){let r=t.buffer,i=t.byteOffset,n=t.byteLength,a=Mr(n),s=this.storageCache.get(e);if(!s)throw new Error("gpu data for uploading does not exist");if(Number(s.originalSize)!==n)throw new Error(`inconsistent data size. gpu data size=${s.originalSize}, data size=${n}`);if(a===n&&i%4===0)this.backend.device.queue.writeBuffer(s.gpuData.buffer,0,r,i,n);else{let u=new Uint8Array(a);u.set(t),this.backend.device.queue.writeBuffer(s.gpuData.buffer,0,u,0,a)}de("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${e})`)}memcpy(e,t){let r=this.storageCache.get(e);if(!r)throw new Error("source gpu data for memcpy does not exist");let i=this.storageCache.get(t);if(!i)throw new Error("destination gpu data for memcpy does not exist");if(r.originalSize!==i.originalSize)throw new Error("inconsistent source and destination gpu data size");let n=Mr(r.originalSize),a=this.backend.getCommandEncoder();this.backend.endComputePass(),a.copyBufferToBuffer(r.gpuData.buffer,0,i.gpuData.buffer,0,n)}registerExternalBuffer(e,t,r){let i;if(r){if(i=r[0],e===r[1])return de("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${i}, buffer is the same, skip.`),i;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw new Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else i=Ki();return this.storageCache.set(i,{gpuData:{id:i,type:0,buffer:e},originalSize:t}),de("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${i}, registered.`),i}unregisterExternalBuffer(e){e!==void 0&&(this.storageCache.delete(e),de("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${e}`))}create(e,t=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let r=jo(e),i,n=(t&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,a=(t&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(n||a){let u=(n?this.freeBuffers:this.freeUniformBuffers).get(r);u?u.length>0?i=u.pop():i=this.backend.device.createBuffer({size:r,usage:t}):i=this.backend.device.createBuffer({size:r,usage:t})}else i=this.backend.device.createBuffer({size:r,usage:t});let s={id:Ki(),type:0,buffer:i};return this.storageCache.set(s.id,{gpuData:s,originalSize:Number(e)}),de("verbose",()=>`[WebGPU] GpuDataManager.create(size=${e}) => id=${s.id}`),s}get(e){return this.storageCache.get(e)?.gpuData}release(e){let t=typeof e=="bigint"?Number(e):e,r=this.storageCache.get(t);if(!r){if(this.storageCache.size===0)return 0;throw new Error("releasing data does not exist")}return de("verbose",()=>`[WebGPU] GpuDataManager.release(id=${t}), gpuDataId=${r.gpuData.id}`),this.storageCache.delete(t),this.buffersPending.push(r.gpuData.buffer),r.originalSize}async download(e,t){let r=this.storageCache.get(Number(e));if(!r)throw new Error("data does not exist");await Mn(this.backend,r.gpuData.buffer,r.originalSize,t)}refreshPendingBuffers(){if(this.buffersPending.length!==0)if(this.backend.sessionStatus==="default"){for(let e of this.buffersPending){let t=ji.get(e.size);if((e.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let r=this.freeBuffers.get(e.size)||[];t===void 0||r.length>=t?e.destroy():r.push(e)}else if((e.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let r=this.freeUniformBuffers.get(e.size)||[];t===void 0||r.length>=t?e.destroy():r.push(e)}else e.destroy()}this.buffersPending=[]}else{let e=this.capturedPendingBuffers.get(this.backend.currentSessionId);e||(e=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,e));for(let t of this.buffersPending)e.push(t);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.freeUniformBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.storageCache.forEach(e=>{e.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onCreateSession(){this.sessionCount+=1}onReleaseSession(e){let t=this.capturedPendingBuffers.get(e);t&&(t.forEach(r=>{r.destroy()}),this.capturedPendingBuffers.delete(e)),this.sessionCount-=1,this.sessionCount===0&&(de("warning",()=>"[WebGPU] Clearing webgpu buffer cache"),this.storageCache.forEach(r=>{r.gpuData.buffer.destroy()}),this.storageCache=new Map)}},Vp=(...e)=>new Zo(...e)}),Qo,he,xe=D(()=>{"use strict";Qo=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},he=e=>new Qo(e)}),Kt,Nr,Ce,Ee,Z,ve,Nn,Ft,wt,K,ir,M,j,Gp,la,Xo,Hp,ie=D(()=>{"use strict";ee(),re(),Kt=64,Nr=(e,t)=>{if(t===3)throw new Error("vec3 has same alignment as vec4, use vec4 instead");switch(Number(e)){case 10:return t>1?`vec${t}<f16>`:"f16";case 1:return t>1?`vec${t}<f32>`:"f32";case 6:return t>1?`vec${t}<i32>`:"i32";case 12:return t>1?`vec${t}<u32>`:"u32";case 7:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(t!==4)throw new Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw new Error(`Unknown data type: ${e}`)}},Ce=(e,t=1)=>{let r=Nr(e,t);return typeof r=="string"?r:r[0]},Ee=(e,t=1)=>{let r=Nr(e,t);return typeof r=="string"?r:r[1]},Z=(...e)=>{let t=[];return e.forEach(r=>{r.length!==0&&t.push({type:12,data:r},{type:12,data:R.computeStrides(r)})}),t},ve=e=>e%4===0?4:e%2===0?2:1,Nn=(e="f32",t,r="0")=>!t||t===1?`${e}(${r})`:`vec${t}<${e}>(${r})`,Ft=(e,t,r)=>e==="f32"?r:t===1?`f32(${r})`:`vec${t}<f32>(${r})`,wt=(e,t)=>t===4?`(${e}.x + ${e}.y + ${e}.z + ${e}.w)`:t===2?`(${e}.x + ${e}.y)`:t===3?`(${e}.x + ${e}.y + ${e}.z)`:e,K=(e,t,r,i)=>e.startsWith("uniforms.")&&r>4?typeof t=="string"?i==="f16"?`${e}[(${t}) / 8][(${t}) % 8 / 4][(${t}) % 8 % 4]`:`${e}[(${t}) / 4][(${t}) % 4]`:i==="f16"?`${e}[${Math.floor(t/8)}][${Math.floor(t%8/4)}][${t%8%4}]`:`${e}[${Math.floor(t/4)}][${t%4}]`:r>1?`${e}[${t}]`:e,ir=(e,t,r,i,n)=>{let a=typeof r=="number",s=a?r:r.length,u=[...new Array(s).keys()],l=s<2?"u32":s<=4?`vec${s}<u32>`:`array<u32, ${s}>`,p=Nr(t,n),c=typeof p=="string"?p:p[1],h=typeof p=="string"?p:p[0],g={indices:l,value:c,storage:h,tensor:t},_=U=>typeof U=="string"?U:`${U}u`,y={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},v=a?"uniforms.":"",S=`${v}${e}_shape`,$=`${v}${e}_strides`,w="";for(let U=0;U<s-1;U++)w+=`
    let dim${U} = current / ${K($,U,s)};
    let rest${U} = current % ${K($,U,s)};
    indices[${U}] = dim${U};
    current = rest${U};
    `;w+=`indices[${s-1}] = current;`;let T=s<2?"":`
  fn o2i_${e}(offset: u32) -> ${g.indices} {
    var indices: ${g.indices};
    var current = offset;
    ${w}
    return indices;
  }`,k=U=>(y.offsetToIndices=!0,s<2?U:`o2i_${e}(${U})`),I=[];if(s>=2)for(let U=s-1;U>=0;U--)I.push(`${K($,U,s)} * (indices[${U}])`);let C=s<2?"":`
  fn i2o_${e}(indices: ${g.indices}) -> u32 {
    return ${I.join("+")};
  }`,A=U=>(y.indicesToOffset=!0,s<2?U:`i2o_${e}(${U})`),x=(...U)=>s===0?"0u":`${g.indices}(${U.map(_).join(",")})`,N=(U,H)=>s<2?`${U}`:`${K(U,H,s)}`,L=(U,H,F)=>s<2?`${U}=${F};`:`${K(U,H,s)}=${F};`,X={},Q=(U,H)=>{y.broadcastedIndicesToOffset=!0;let F=`${H.name}broadcastedIndicesTo${e}Offset`;if(F in X)return`${F}(${U})`;let V=[];for(let Se=s-1;Se>=0;Se--){let Ve=H.indicesGet("outputIndices",Se+H.rank-s);V.push(`${N($,Se)} * (${Ve} % ${N(S,Se)})`)}return X[F]=`fn ${F}(outputIndices: ${H.type.indices}) -> u32 {
             return ${V.length>0?V.join("+"):"0u"};
           }`,`${F}(${U})`},J=(U,H)=>(()=>{if(g.storage===g.value)return`${e}[${U}]=${H};`;if(g.storage==="vec2<u32>"&&g.value==="i32")return`${e}[${U}]=vec2<u32>(u32(${H}), select(0u, 0xFFFFFFFFu, ${H} < 0));`;if(g.storage==="vec2<u32>"&&g.value==="u32")return`${e}[${U}]=vec2<u32>(u32(${H}), 0u);`;if(g.storage==="u32"&&g.value==="vec4<bool>")return`${e}[${U}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${H}));`;throw new Error(`not supported combination of storage type ${g.storage} and value type ${g.value} yet`)})(),O=U=>(()=>{if(g.storage===g.value)return`${e}[${U}]`;if(g.storage==="vec2<u32>"&&g.value==="i32")return`i32(${e}[${U}].x)`;if(g.storage==="vec2<u32>"&&g.value==="u32")return`u32(${e}[${U}].x)`;if(g.storage==="u32"&&g.value==="vec4<bool>")return`vec4<bool>(bool(${e}[${U}] & 0xFFu), bool(${e}[${U}] & 0xFF00u), bool(${e}[${U}] & 0xFF0000u), bool(${e}[${U}] & 0xFF000000u))`;throw new Error(`not supported combination of storage type ${g.storage} and value type ${g.value} yet`)})(),W=s<2?"":`
  fn get_${e}ByIndices(indices: ${g.indices}) -> ${c} {
    return ${O(`i2o_${e}(indices)`)};
  }`,Y=s<2?"":(()=>{let U=u.map(F=>`d${F}: u32`).join(", "),H=u.map(F=>`d${F}`).join(", ");return`
  fn get_${e}(${U}) -> ${c} {
    return get_${e}ByIndices(${x(H)});
  }`})(),P=(...U)=>{if(U.length!==s)throw new Error(`indices length must be ${s}`);let H=U.map(_).join(",");return s===0?O("0u"):s===1?O(H[0]):(y.get=!0,y.getByIndices=!0,y.indicesToOffset=!0,`get_${e}(${H})`)},se=U=>s<2?O(U):(y.getByIndices=!0,y.indicesToOffset=!0,`get_${e}ByIndices(${U})`),ne=s<2?"":`
  fn set_${e}ByIndices(indices: ${g.indices}, value: ${c}) {
    ${J(`i2o_${e}(indices)`,"value")}
  }`,te=s<2?"":(()=>{let U=u.map(F=>`d${F}: u32`).join(", "),H=u.map(F=>`d${F}`).join(", ");return`
  fn set_${e}(${U}, value: ${c}) {
    set_${e}ByIndices(${x(H)}, value);
  }`})();return{impl:()=>{let U=[],H=!1;return y.offsetToIndices&&(U.push(T),H=!0),y.indicesToOffset&&(U.push(C),H=!0),y.broadcastedIndicesToOffset&&(Object.values(X).forEach(F=>U.push(F)),H=!0),y.set&&(U.push(te),H=!0),y.setByIndices&&(U.push(ne),H=!0),y.get&&(U.push(Y),H=!0),y.getByIndices&&(U.push(W),H=!0),!a&&H&&U.unshift(`const ${S} = ${g.indices}(${r.join(",")});`,`const ${$} = ${g.indices}(${R.computeStrides(r).join(",")});`),U.join(`
`)},type:g,offsetToIndices:k,indicesToOffset:A,broadcastedIndicesToOffset:Q,indices:x,indicesGet:N,indicesSet:L,set:(...U)=>{if(U.length!==s+1)throw new Error(`indices length must be ${s}`);let H=U[s];if(typeof H!="string")throw new Error("value must be string");let F=U.slice(0,s).map(_).join(",");return s===0?J("0u",H):s===1?J(F[0],H):(y.set=!0,y.setByIndices=!0,y.indicesToOffset=!0,`set_${e}(${F}, ${H})`)},setByOffset:J,setByIndices:(U,H)=>s<2?J(U,H):(y.setByIndices=!0,y.indicesToOffset=!0,`set_${e}ByIndices(${U}, ${H});`),get:P,getByOffset:O,getByIndices:se,usage:i,name:e,strides:$,shape:S,rank:s}},M=(e,t,r,i=1)=>ir(e,t,r,"input",i),j=(e,t,r,i=1)=>ir(e,t,r,"output",i),Gp=(e,t,r)=>ir(e,t,r,"atomicOutput",1),la=(e,t,r,i=1)=>ir(e,t,r,"internal",i),Xo=class{constructor(e,t){this.normalizedDispatchGroup=e,this.limits=t,this.internalVariables=[],this.variables=[],this.uniforms=[],this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(e){return`if (global_idx >= ${typeof e=="number"?`${e}u`:e}) { return; }`}mainStart(e=Kt){let t=typeof e=="number"?e:e[0],r=typeof e=="number"?1:e[1],i=typeof e=="number"?1:e[2];if(t>this.limits.maxComputeWorkgroupSizeX||r>this.limits.maxComputeWorkgroupSizeY||i>this.limits.maxComputeWorkgroupSizeZ)throw new Error(`workgroup size [${t}, ${r}, ${i}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(t*r*i>this.limits.maxComputeInvocationsPerWorkgroup)throw new Error(`workgroup size [${t}, ${r}, ${i}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let n=this.normalizedDispatchGroup[1]===1&&this.normalizedDispatchGroup[2]===1,a=n?`@builtin(global_invocation_id) global_id : vec3<u32>,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(local_invocation_id) local_id : vec3<u32>`:`@builtin(global_invocation_id) global_id : vec3<u32>,
                                             @builtin(local_invocation_id) local_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(num_workgroups) num_workgroups : vec3<u32>`,s=n?`let global_idx = global_id.x;
         let workgroup_index = workgroup_id.x;`:`let workgroup_index = workgroup_id.z * num_workgroups[0] * num_workgroups[1] +
             workgroup_id.y * num_workgroups[0] + workgroup_id.x;
         let global_idx = workgroup_index * ${t*r*i}u + local_idx;`;return`@compute @workgroup_size(${t}, ${r}, ${i})
  fn main(${a}) {
    ${s}
  `}appendVariableUniforms(e){e.rank!==0&&(e.shape.startsWith("uniforms.")&&this.uniforms.push({name:e.shape.replace("uniforms.",""),type:"u32",length:e.rank}),e.strides.startsWith("uniforms.")&&this.uniforms.push({name:e.strides.replace("uniforms.",""),type:"u32",length:e.rank}))}declareVariable(e,t){if(e.usage==="internal")throw new Error("cannot use internal variable with declareVariable(). use registerInternalVariables() instead.");this.variables.push(e),this.appendVariableUniforms(e);let r=e.usage==="input"?"read":"read_write",i=e.usage==="atomicOutput"?"atomic<i32>":e.type.storage;return`@group(0) @binding(${t}) var<storage, ${r}> ${e.name}: array<${i}>;`}declareVariables(...e){return e.map(t=>this.declareVariable(t,this.variableIndex++)).join(`
`)}registerInternalVariable(e){if(e.usage!=="internal")throw new Error("cannot use input or output variable with registerInternalVariable(). use declareVariables() instead.");this.internalVariables.push(e),this.appendVariableUniforms(e)}registerInternalVariables(...e){return e.forEach(t=>this.registerInternalVariable(t)),this}registerUniform(e,t,r=1){return this.uniforms.push({name:e,type:t,length:r}),this}registerUniforms(e){return this.uniforms=this.uniforms.concat(e),this}uniformDeclaration(){if(this.uniforms.length===0)return"";let e=[];for(let{name:t,type:r,length:i}of this.uniforms)if(i&&i>4)r==="f16"?e.push(`@align(16) ${t}:array<mat2x4<${r}>, ${Math.ceil(i/8)}>`):e.push(`${t}:array<vec4<${r}>, ${Math.ceil(i/4)}>`);else{let n=i==null||i===1?r:`vec${i}<${r}>`;e.push(`${t}:${n}`)}return`
      struct Uniforms { ${e.join(", ")} };
      @group(0) @binding(${this.variableIndex}) var<uniform> uniforms: Uniforms;`}get additionalImplementations(){return this.uniformDeclaration()+this.variables.map(e=>e.impl()).join(`
`)+this.internalVariables.map(e=>e.impl()).join(`
`)}get variablesInfo(){if(this.uniforms.length===0)return;let e=t=>[12,10,1,6][["u32","f16","f32","i32"].indexOf(t)];return this.uniforms.map(t=>[e(t.type),t.length??1])}},Hp=(e,t)=>new Xo(e,t)}),Yo,Zi,Jo,eu,tu,ru,Ue,Fp,jp,$t=D(()=>{"use strict";ee(),re(),xe(),ie(),Yo=(e,t)=>{if(!e||e.length!==1)throw new Error("Transpose requires 1 input.");if(t.length!==0&&t.length!==e[0].dims.length)throw new Error(`perm size ${t.length} does not match input rank ${e[0].dims.length}`)},Zi=(e,t)=>t.length!==0?t:[...new Array(e).keys()].reverse(),Jo=(e,t)=>R.sortBasedOnPerm(e,Zi(e.length,t)),eu=(e,t,r,i)=>{let n=`fn perm(i: ${i.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`;for(let a=0;a<t;++a)n+=`a[${e[a]}]=i[${a}];`;return n+="return a;}"},tu=(e,t)=>{let r=[],i=[];for(let n=0;n<e.length;++n)e[n]!==1&&r.push(e[n]),e[t[n]]!==1&&i.push(t[n]);return{newShape:r,newPerm:i}},ru=(e,t)=>{let r=0;for(let i=0;i<e.length;++i)if(t[e[i]]!==1){if(e[i]<r)return!1;r=e[i]}return!0},Ue=(e,t)=>{let r=e.dataType,i=e.dims.length,n=Zi(i,t),a=Jo(e.dims,n),s=e.dims,u=a,l=i<2||ru(n,e.dims),p;if(l)return p=y=>{let v=M("input",r,s,4),S=j("output",r,u,4);return`
  ${y.registerUniform("output_size","u32").declareVariables(v,S)}
  ${y.mainStart()}
    ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    output[global_idx] = input[global_idx];
  }`},{name:"TransposeCopy",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let y=R.size(a);return{outputs:[{dims:a,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(y/64/4)},programUniforms:[{type:12,data:Math.ceil(y/4)}]}},getShaderSource:p};let{newShape:c,newPerm:h}=tu(e.dims,n),g=R.areEqual(h,[2,3,1]),_=R.areEqual(h,[3,1,2]);if(c.length===2||g||_){s=g?[c[0],c[1]*c[2]]:_?[c[0]*c[1],c[2]]:c,u=[s[1],s[0]];let y=16;return p=v=>{let S=M("a",r,s.length),$=j("output",r,u.length);return`
  ${v.registerUniform("output_size","u32").declareVariables(S,$)}
  var<workgroup> tile : array<array<${$.type.value}, ${y+1}>, ${y}>;
  ${v.mainStart([y,y,1])}
    let stride = (uniforms.output_shape[1] - 1) / ${y} + 1;
    let workgroup_id_x = workgroup_index % stride;
    let workgroup_id_y = workgroup_index / stride;
    let input_col = workgroup_id_y * ${y}u + local_id.x;
    let input_row = workgroup_id_x * ${y}u + local_id.y;
    if (input_row < uniforms.a_shape[0] && input_col < uniforms.a_shape[1]) {
      tile[local_id.y][local_id.x] = ${S.getByIndices(`${S.type.indices}(input_row, input_col)`)};
    }
    workgroupBarrier();

    let output_col = workgroup_id_x * ${y}u + local_id.x;
    let output_row = workgroup_id_y * ${y}u + local_id.y;
    if (output_row < uniforms.output_shape[0] && output_col < uniforms.output_shape[1]) {
      ${$.setByIndices(`${$.type.indices}(output_row, output_col)`,"tile[local_id.x][local_id.y]")}
    }
  }`},{name:"TransposeShared",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let v=R.size(a);return{outputs:[{dims:a,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(u[1]/y),y:Math.ceil(u[0]/y)},programUniforms:[{type:12,data:v},...Z(s,u)]}},getShaderSource:p}}return p=y=>{let v=M("a",r,s.length),S=j("output",r,u.length);return`
  ${y.registerUniform("output_size","u32").declareVariables(v,S)}

  ${eu(n,i,v,S)}

  ${y.mainStart()}
    ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${S.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${S.setByOffset("global_idx",v.getByIndices("aIndices"))}
  }`},{name:"Transpose",shaderCache:{hint:`${t}`,inputDependencies:["rank"]},getRunData:()=>{let y=R.size(a);return{outputs:[{dims:a,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(y/64)},programUniforms:[{type:12,data:y},...Z(s,u)]}},getShaderSource:p}},Fp=(e,t)=>{Yo(e.inputs,t.perm),e.compute(Ue(e.inputs[0],t.perm))},jp=e=>he({perm:e.perm})}),iu,nu,au,su,ou,uu,lu,du,pu,cu,He,Kp,Zp,Qp,Xp,Yp,Jp,ec,tc,rc,ic,D0=D(()=>{"use strict";ee(),re(),ie(),da(),$t(),iu={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},nu={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},au={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},su={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},ou=(e,t)=>{let r=[];for(let i=t-e;i<t;++i)r.push(i);return r},uu=(e,t)=>{let r=[],i=e.length;for(let a=0;a<i;a++)t.indexOf(a)===-1&&r.push(e[a]);let n=t.map(a=>e[a]);return[r,n]},lu=(e,t)=>{let r=e.length+t.length,i=[],n=0;for(let a=0;a<r;a++)t.indexOf(a)===-1?i.push(e[n++]):i.push(1);return i},du=(e,t)=>{for(let r=0;r<e.length;++r)if(e[e.length-r-1]!==t-1-r)return!1;return!0},pu=(e,t)=>{let r=[];if(!du(e,t)){for(let i=0;i<t;++i)e.indexOf(i)===-1&&r.push(i);e.forEach(i=>r.push(i))}return r},cu=(e,t,r,i,n,a,s)=>{let u=r[0].dims,l=R.size(a),p=R.size(s),c=M("_A",r[0].dataType,u),h=j("output",n,a),g=64;l===1&&(g=256);let _=`
          var<workgroup> aBestValues : array<f32, ${g}>;
       `,y=v=>`
        ${v.registerUniform("reduceSize","u32").declareVariables(c,h)}
        ${_}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${v.mainStart(g)}

          let outputIndex = global_idx / ${g};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${au[i]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${g}) {
           let candidate = f32(${c.getByOffset("offset + k")});
           bestValue = ${iu[i]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${g}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${nu[i]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${h.setByOffset("outputIndex",`${i==="mean"?`${h.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${h.type.storage}(${su[i]})`}`)};
         }
        }`;return{name:e,shaderCache:{hint:`${t};${g}`,inputDependencies:["type"]},getShaderSource:y,getRunData:()=>({outputs:[{dims:a,dataType:n}],dispatchGroup:{x:l},programUniforms:[{type:12,data:p}]})}},He=(e,t,r,i)=>{let n=e.inputs.length===1?r:Dn(e.inputs,r),a=n.axes;a.length===0&&!n.noopWithEmptyAxes&&(a=e.inputs[0].dims.map((_,y)=>y));let s=R.normalizeAxes(a,e.inputs[0].dims.length),u=s,l=e.inputs[0],p=pu(u,e.inputs[0].dims.length);p.length>0&&(l=e.compute(Ue(e.inputs[0],p),{inputs:[0],outputs:[-1]})[0],u=ou(u.length,l.dims.length));let[c,h]=uu(l.dims,u),g=c;n.keepDims&&(g=lu(c,s)),e.compute(cu(t,n.cacheKey,[l],i,e.inputs[0].dataType,g,h),{inputs:[l]})},Kp=(e,t)=>{He(e,"ReduceMeanShared",t,"mean")},Zp=(e,t)=>{He(e,"ReduceL1Shared",t,"l1")},Qp=(e,t)=>{He(e,"ReduceL2Shared",t,"l2")},Xp=(e,t)=>{He(e,"ReduceLogSumExpShared",t,"logSumExp")},Yp=(e,t)=>{He(e,"ReduceMaxShared",t,"max")},Jp=(e,t)=>{He(e,"ReduceMinShared",t,"min")},ec=(e,t)=>{He(e,"ReduceProdShared",t,"prod")},tc=(e,t)=>{He(e,"ReduceSumShared",t,"sum")},rc=(e,t)=>{He(e,"ReduceSumSquareShared",t,"sumSquare")},ic=(e,t)=>{He(e,"ReduceLogSumShared",t,"logSum")}}),Fe,fu,Jr,Dn,je,hu,mu,gu,yu,_u,wu,$u,bu,vu,xu,Ke,nc,ac,sc,oc,uc,lc,dc,pc,cc,fc,da=D(()=>{"use strict";ee(),re(),xe(),ie(),D0(),Fe=e=>{if(!e||e.length===0||e.length>2)throw new Error("Reduce op requires 1 or 2 inputs.");if(e.length===2&&e[1].dims.length!==1)throw new Error("Invalid axes input dims.")},fu=e=>["","",`var value = ${e.getByIndices("input_indices")};`,""],Jr=(e,t,r,i,n,a,s=!1,u=!1)=>{let l=[],p=r[0].dims,c=p.length,h=R.normalizeAxes(n,c),g=!u&&h.length===0;p.forEach((v,S)=>{g||h.indexOf(S)>=0?s&&l.push(1):l.push(v)});let _=l.length,y=R.size(l);return{name:e,shaderCache:t,getShaderSource:v=>{let S=[],$=M("_A",r[0].dataType,c),w=j("output",a,_),T=i($,w,h),k=T[2];for(let I=0,C=0;I<c;I++)g||h.indexOf(I)>=0?(s&&C++,k=`for(var j${I}: u32 = 0; j${I} < ${p[I]}; j${I}++) {
                  ${T[2].includes("last_index")?`let last_index = j${I};`:""}
                  ${$.indicesSet("input_indices",I,`j${I}`)}
                  ${k}
                }`):(S.push(`${$.indicesSet("input_indices",I,w.indicesGet("output_indices",C))};`),C++);return`

        ${v.registerUniform("output_size","u32").declareVariables($,w)}

        ${v.mainStart()}
          ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${$.type.indices};
          let output_indices = ${w.offsetToIndices("global_idx")};

          ${S.join(`
`)}
          ${T[0]}       // init ops for reduce max/min
          ${T[1]}
          ${k}
          ${T[3]}
          ${T.length===4?w.setByOffset("global_idx","value"):T.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:l,dataType:a}],dispatchGroup:{x:Math.ceil(y/64)},programUniforms:[{type:12,data:y},...Z(p,l)]})}},Dn=(e,t)=>{let r=[];return e[1].dims[0]>0&&e[1].getBigInt64Array().forEach(i=>r.push(Number(i))),he({axes:r,keepDims:t.keepDims,noopWithEmptyAxes:t.noopWithEmptyAxes})},je=(e,t,r,i)=>{let n=e.inputs,a=n.length===1?r:Dn(n,r);e.compute(Jr(t,{hint:a.cacheKey,inputDependencies:["rank"]},[n[0]],a.noopWithEmptyAxes&&a.axes.length===0?fu:i,a.axes,n[0].dataType,a.keepDims,a.noopWithEmptyAxes),{inputs:[0]})},hu=(e,t)=>{Fe(e.inputs),je(e,"ReduceLogSum",t,(r,i)=>[`var value = ${i.type.storage}(0);`,"",`value += ${r.getByIndices("input_indices")};`,"value = log(value);"])},mu=(e,t)=>{Fe(e.inputs),je(e,"ReduceL1",t,(r,i)=>[`var value = ${i.type.storage}(0);`,"",`value += abs(${r.getByIndices("input_indices")});`,""])},gu=(e,t)=>{Fe(e.inputs),je(e,"ReduceL2",t,(r,i)=>[`var t = ${i.type.value}(0); var value = ${i.type.value}(0);`,"",`t = ${r.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])},yu=(e,t)=>{Fe(e.inputs),je(e,"ReduceLogSumExp",t,(r,i)=>[`var value = ${i.type.storage}(0);`,"",`value += exp(${r.getByIndices("input_indices")});`,"value = log(value);"])},_u=(e,t)=>{Fe(e.inputs),je(e,"ReduceMax",t,(r,i,n)=>{let a=[];for(let s=0;s<r.rank;s++)(n.indexOf(s)>=0||n.length===0)&&a.push(r.indicesSet("input_indices",s,0));return[`${a.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};`,`value = max(value, ${r.getByIndices("input_indices")});`,""]})},wu=(e,t)=>{Fe(e.inputs),je(e,"ReduceMean",t,(r,i,n)=>{let a=1;for(let s=0;s<r.rank;s++)(n.indexOf(s)>=0||n.length===0)&&(a*=e.inputs[0].dims[s]);return["var sum = f32(0);","",`sum += f32(${r.getByIndices("input_indices")});`,`let value = ${i.type.value}(sum / ${a});`]})},$u=(e,t)=>{Fe(e.inputs),je(e,"ReduceMin",t,(r,i,n)=>{let a=[];for(let s=0;s<r.rank;s++)(n.indexOf(s)>=0||n.length===0)&&a.push(`input_indices[${s}] = 0;`);return[`${a.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};`,`value = min(value, ${r.getByIndices("input_indices")});`,""]})},bu=(e,t)=>{Fe(e.inputs),je(e,"ReduceProd",t,(r,i)=>[`var value = ${i.type.storage}(1);`,"",`value *= ${r.getByIndices("input_indices")};`,""])},vu=(e,t)=>{Fe(e.inputs),je(e,"ReduceSum",t,(r,i)=>[`var value = ${i.type.storage}(0);`,"",`value += ${r.getByIndices("input_indices")};`,""])},xu=(e,t)=>{Fe(e.inputs),je(e,"ReduceSumSquare",t,(r,i)=>[`var t = ${i.type.value}(0); var value = ${i.type.value}(0);`,"",`t = ${r.getByIndices("input_indices")}; value += t * t;`,""])},Ke=(e,t,r)=>{if(t.length===0)return r;let i=1,n=1;for(let a=0;a<t.length;a++)t.indexOf(a)===-1?i*=e[a]:n*=e[a];return n<32&&i>1024},nc=(e,t)=>{Ke(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?wu(e,t):Kp(e,t)},ac=(e,t)=>{Ke(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?mu(e,t):Zp(e,t)},sc=(e,t)=>{Ke(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?gu(e,t):Qp(e,t)},oc=(e,t)=>{Ke(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?yu(e,t):Xp(e,t)},uc=(e,t)=>{Ke(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?_u(e,t):Yp(e,t)},lc=(e,t)=>{Ke(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?$u(e,t):Jp(e,t)},dc=(e,t)=>{Ke(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?bu(e,t):ec(e,t)},pc=(e,t)=>{Ke(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?vu(e,t):tc(e,t)},cc=(e,t)=>{Ke(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?xu(e,t):rc(e,t)},fc=(e,t)=>{Ke(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?hu(e,t):ic(e,t)}}),Qi,hc,mc,Un,U0=D(()=>{"use strict";ee(),xe(),da(),Qi=e=>{if(!e||e.length===0||e.length>2)throw new Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(e[0].dataType!==1)throw new Error("Invalid input type.")},hc=(e,t)=>{Qi(e.inputs);let r=(i,n,a)=>{let s=[];for(let u=0;u<i.rank;u++)(a.indexOf(u)>=0||a.length===0)&&s.push(`input_indices[${u}] = 0;`);return[`${s.join(`
`)}`,`var value = ${i.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${i.getByIndices("input_indices")} ${t.selectLastIndex>0?"<=":"<"} value) {
         value = ${i.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",n.setByOffset("global_idx","best_index")]};e.compute(Jr("ArgMin",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},mc=(e,t)=>{Qi(e.inputs);let r=(i,n,a)=>{let s=[];for(let u=0;u<i.rank;u++)(a.indexOf(u)>=0||a.length===0)&&s.push(`input_indices[${u}] = 0;`);return[`${s.join(`
`)}`,`var value = ${i.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${i.getByIndices("input_indices")} ${t.selectLastIndex>0?">=":">"} value) {
         value = ${i.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",n.setByOffset("global_idx","best_index")]};e.compute(Jr("argMax",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},Un=e=>he(e)}),Su,Dr,ku,Tu,Iu,_r,Eu,gc,pa=D(()=>{"use strict";ee(),re(),ua(),ie(),Su=(e,t)=>{let r=e[0],i=e[1],n=e[2],a=e[3],s=e[4],u=e[5];if(s&&u)throw new Error("Attention cannot have both past and attention_bias");if(r.dims.length!==3)throw new Error('Input "input" must have 3 dimensions');let l=r.dims[0],p=r.dims[1],c=r.dims[2];if(n.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimensions');if(i.dims.length!==2)throw new Error('Input "weights" is expected to have 2 dimensions');if(i.dims[0]!==c)throw new Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(n.dims[0]!==i.dims[1])throw new Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let h=n.dims[0]/3,g=h,_=g;if(t.qkvHiddenSizes.length>0){if(t.qkvHiddenSizes.length!==3)throw new Error("qkv_hidden_sizes attribute should have 3 elements");for(let T of t.qkvHiddenSizes)if(T%t.numHeads!==0)throw new Error("qkv_hidden_sizes should be divisible by num_heads");h=t.qkvHiddenSizes[0],g=t.qkvHiddenSizes[1],_=t.qkvHiddenSizes[2]}let y=p;if(h!==g)throw new Error("qkv_hidden_sizes first element should be same as the second");if(n.dims[0]!==h+g+_)throw new Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let v=0;if(s){if(g!==_)throw new Error('Input "past" expect k_hidden_size == v_hidden_size');if(s.dims.length!==5)throw new Error('Input "past" must have 5 dimensions');if(s.dims[0]!==2)throw new Error('Input "past" first dimension must be 2');if(s.dims[1]!==l)throw new Error('Input "past" second dimension must be batch_size');if(s.dims[2]!==t.numHeads)throw new Error('Input "past" third dimension must be num_heads');if(s.dims[4]!==g/t.numHeads)throw new Error('Input "past" fifth dimension must be k_hidden_size / num_heads');t.pastPresentShareBuffer||(v=s.dims[3])}let S=y+v,$=-1,w=0;if(a)throw new Error("Mask not supported");if(s)throw new Error("past is not supported");if(u){if(u.dims.length!==4)throw new Error('Input "attention_bias" must have 4 dimensions');if(u.dims[0]!==l||u.dims[1]!==t.numHeads||u.dims[2]!==p||u.dims[3]!==S)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:l,sequenceLength:p,pastSequenceLength:v,kvSequenceLength:y,totalSequenceLength:S,maxSequenceLength:$,inputHiddenSize:c,hiddenSize:h,vHiddenSize:_,headSize:Math.floor(h/t.numHeads),vHeadSize:Math.floor(_/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:w,scale:t.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},Dr=(e,t,r)=>t&&e?`
      let total_sequence_length_input = u32(${t.getByOffset("0")});
      let present_sequence_length = max(total_sequence_length_input, uniforms.past_sequence_length);
      let is_subsequent_prompt: bool = sequence_length > 1 && sequence_length != total_sequence_length_input;
      let is_first_prompt: bool = is_subsequent_prompt == false && sequence_length == total_sequence_length_input;
      total_sequence_length = u32(${e?.getByOffset("batchIdx")}) + 1;
      var past_sequence_length: u32 = 0;
      if (is_first_prompt == false) {
        past_sequence_length = total_sequence_length - sequence_length;
      }
       `:`
    ${r?"let past_sequence_length = uniforms.past_sequence_length":""};
    let present_sequence_length = total_sequence_length;
    `,ku=(e,t,r,i,n,a,s,u)=>{let l=ve(s?1:a),p=64,c=a/l;c<p&&(p=32);let h=Math.ceil(a/l/p),g=[{type:12,data:t},{type:12,data:r},{type:12,data:i},{type:12,data:n},{type:12,data:c},{type:12,data:h}],_=Ce(e.dataType,l),y=Ee(1,l),v=["type"];s&&v.push("type"),u&&v.push("type");let S=$=>{let w=j("x",e.dataType,e.dims,l),T=[w],k=s?M("seq_lens",s.dataType,s.dims):void 0;k&&T.push(k);let I=u?M("total_sequence_length_input",u.dataType,u.dims):void 0;I&&T.push(I);let C=Ee(e.dataType),A=[{name:"batch_size",type:"u32"},{name:"num_heads",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"sequence_length",type:"u32"},{name:"total_sequence_length",type:"u32"},{name:"elements_per_thread",type:"u32"}];return`
  var<workgroup> thread_max: array<f32, ${p}>;
  var<workgroup> thread_sum: array<f32, ${p}>;
  ${$.registerUniforms(A).declareVariables(...T)}
  ${$.mainStart([p,1,1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${Dr(k,I,!1)}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${p}) * uniforms.total_sequence_length + local_offset;
    let seq_causal_length = ${s?"u32(past_sequence_length + workgroup_id.y + 1)":"total_sequence_length"};
    var thread_max_vector = ${y}(-3.4028234663852886e+38f);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      thread_max_vector = max(${y}(x[offset + i]), thread_max_vector);
    }
    thread_max[local_idx] = ${(()=>{switch(l){case 1:return"thread_max_vector";case 2:return"max(thread_max_vector.x, thread_max_vector.y)";case 4:return"max(max(thread_max_vector.x, thread_max_vector.y), max(thread_max_vector.z, thread_max_vector.w))";default:throw new Error(`Unsupported components: ${l}`)}})()};
    workgroupBarrier();

    var max_value =  f32(-3.4028234663852886e+38f);
    for (var i = 0u; i < ${p}; i++) {
      max_value = max(thread_max[i], max_value);
    }

    var sum_vector = ${y}(0);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      sum_vector += exp(${y}(x[offset + i]) - max_value);
    }
    thread_sum[local_idx] = ${(()=>{switch(l){case 1:return"sum_vector";case 2:return"sum_vector.x + sum_vector.y";case 4:return"sum_vector.x + sum_vector.y + sum_vector.z + sum_vector.w";default:throw new Error(`Unsupported components: ${l}`)}})()};
    workgroupBarrier();

    var sum: f32 = 0;
    for (var i = 0u; i < ${p}; i++) {
      sum += thread_sum[i];
    }

    if (sum == 0) {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        x[offset + i] = ${w.type.value}(${C}(1.0) / ${C}(seq_causal_length));
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        var f32input = ${y}(x[offset + i]);
        x[offset + i] = ${w.type.value}(exp(f32input - max_value) / sum);
      }
    }
      ${s?`
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${w.type.value}(${C}(0));
        }`:""};
  }`};return{name:"AttentionProbsSoftmax",shaderCache:{hint:`${p};${_};${l}`,inputDependencies:v},getShaderSource:S,getRunData:()=>({outputs:[],dispatchGroup:{x:1,y:n,z:t*r},programUniforms:g})}},Tu=(e,t,r,i,n,a,s,u,l)=>{let p=s+a.kvSequenceLength,c=[a.batchSize,a.numHeads,a.sequenceLength,p],h=e>1&&i,g=a.kvNumHeads?a.kvNumHeads:a.numHeads,_=h?[a.batchSize,g,p,a.headSize]:void 0,y=a.nReps?a.nReps:1,v=a.scale===0?1/Math.sqrt(a.headSize):a.scale,S=ve(a.headSize),$=a.headSize/S,w=12,T={x:Math.ceil(p/w),y:Math.ceil(a.sequenceLength/w),z:a.batchSize*a.numHeads},k=[{type:12,data:a.sequenceLength},{type:12,data:$},{type:12,data:p},{type:12,data:a.numHeads},{type:12,data:a.headSize},{type:1,data:v},{type:12,data:s},{type:12,data:a.kvSequenceLength},{type:12,data:y}],I=h&&i&&R.size(i.dims)>0,C=["type","type"];I&&C.push("type"),n&&C.push("type"),u&&C.push("type"),l&&C.push("type");let A=[{dims:c,dataType:t.dataType,gpuDataType:0}];h&&A.push({dims:_,dataType:t.dataType,gpuDataType:0});let x=N=>{let L=M("q",t.dataType,t.dims,S),X=M("key",r.dataType,r.dims,S),Q=[L,X];if(I){let ne=M("past_key",i.dataType,i.dims,S);Q.push(ne)}n&&Q.push(M("attention_bias",n.dataType,n.dims));let J=u?M("seq_lens",u.dataType,u.dims):void 0;J&&Q.push(J);let O=l?M("total_sequence_length_input",l.dataType,l.dims):void 0;O&&Q.push(O);let W=j("output",t.dataType,c),Y=[W];h&&Y.push(j("present_key",t.dataType,_,S));let P=Ee(1,S),se=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${w}u;

  var<workgroup> tileQ: array<${L.type.storage}, ${w*w}>;
  var<workgroup> tileK: array<${L.type.storage}, ${w*w}>;
  ${N.registerUniforms(se).declareVariables(...Q,...Y)}
  ${N.mainStart([w,w,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let kvHeadIdx = ${y===1?"headIdx":"headIdx / uniforms.n_reps"};
    let kv_num_heads = ${y===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let sequence_length = uniforms.M;
    var total_sequence_length = uniforms.N;
    ${Dr(J,O,!0)}
    let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx;
    let qOffset = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
    ${I&&h?"let pastKeyOffset = absKvHeadIdx * uniforms.past_sequence_length * uniforms.K;":""};
    let kOffset = absKvHeadIdx * uniforms.kv_sequence_length * uniforms.K;
    ${h?"let presentKeyOffset = absKvHeadIdx * uniforms.N * uniforms.K;":""}
    var value = ${P}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${I&&h?`
              if (n + local_id.y < past_sequence_length) {
                tileK[idx] = past_key[pastKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
              } else if (n + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
                tileK[idx] = key[kOffset + (n + local_id.y - past_sequence_length) * uniforms.K + w + local_id.x];
              }`:`
          if (n + local_id.y < uniforms.kv_sequence_length) {
            tileK[idx] = key[kOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
          }`}
      ${h?`if (n + local_id.y < present_sequence_length) {
        present_key[presentKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x] = tileK[idx];
      }`:""}
      }
      workgroupBarrier();

      for (var k: u32 = 0u; k < TILE_SIZE && w+k < uniforms.K; k++) {
          value += ${P}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    if (global_id.y < uniforms.M && global_id.x < total_sequence_length) {
      let headOffset = workgroup_id.z * uniforms.M * uniforms.N;
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(()=>{switch(S){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw new Error(`Unsupported components: ${S}`)}})()};
        output[outputIdx] = ${W.type.value} (sum * uniforms.alpha) + ${n?"attention_bias[outputIdx]":"0.0"};
    }
  }`};return{name:"AttentionProbs",shaderCache:{hint:`${S};${n!==void 0};${i!==void 0};${e}`,inputDependencies:C},getRunData:()=>({outputs:A,dispatchGroup:T,programUniforms:k}),getShaderSource:x}},Iu=(e,t,r,i,n,a,s=void 0,u=void 0)=>{let l=a+n.kvSequenceLength,p=n.nReps?n.nReps:1,c=n.vHiddenSize*p,h=e>1&&i,g=n.kvNumHeads?n.kvNumHeads:n.numHeads,_=h?[n.batchSize,g,l,n.headSize]:void 0,y=[n.batchSize,n.sequenceLength,c],v=12,S={x:Math.ceil(n.vHeadSize/v),y:Math.ceil(n.sequenceLength/v),z:n.batchSize*n.numHeads},$=[{type:12,data:n.sequenceLength},{type:12,data:l},{type:12,data:n.vHeadSize},{type:12,data:n.numHeads},{type:12,data:n.headSize},{type:12,data:c},{type:12,data:a},{type:12,data:n.kvSequenceLength},{type:12,data:p}],w=h&&i&&R.size(i.dims)>0,T=["type","type"];w&&T.push("type"),s&&T.push("type"),u&&T.push("type");let k=[{dims:y,dataType:t.dataType,gpuDataType:0}];h&&k.push({dims:_,dataType:t.dataType,gpuDataType:0});let I=C=>{let A=M("probs",t.dataType,t.dims),x=M("v",r.dataType,r.dims),N=[A,x];w&&N.push(M("past_value",i.dataType,i.dims));let L=s?M("seq_lens",s.dataType,s.dims):void 0;s&&N.push(L);let X=u?M("total_sequence_length_input",u.dataType,u.dims):void 0;u&&N.push(X);let Q=[j("output",t.dataType,y)];h&&Q.push(j("present_value",t.dataType,_));let J=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${v}u;
  var<workgroup> tileQ: array<${A.type.value}, ${v*v}>;
  var<workgroup> tileV: array<${A.type.value}, ${v*v}>;
  ${C.registerUniforms(J).declareVariables(...N,...Q)}
  ${C.mainStart([v,v,1])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${p===1?"headIdx":"headIdx / uniforms.n_reps"};
   let kv_num_heads = ${p===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
   let m = global_id.y;
   let n = global_id.x;
   let sequence_length = uniforms.M;
   var total_sequence_length = uniforms.K;
   ${Dr(L,X,!0)}
   let offsetA = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
   let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx; // kvHeadIdx is relative to the batch
   ${w&&h?"let pastValueOffset = absKvHeadIdx * uniforms.N * uniforms.past_sequence_length + n;":""};
   let vOffset = absKvHeadIdx * uniforms.N * uniforms.kv_sequence_length + n;
   ${h?"let presentValueOffset = absKvHeadIdx * uniforms.N * uniforms.K + n;":""}
   var value = ${A.type.storage}(0);
   for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = probs[offsetA + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
        ${w&&h?`
        if (w + local_id.y < past_sequence_length) {
          tileV[idx] = past_value[pastValueOffset + (w + local_id.y) * uniforms.N];
        } else if (w + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
          tileV[idx] = v[vOffset + (w + local_id.y - past_sequence_length) * uniforms.N];
        }
      `:`
            if (w + local_id.y < uniforms.kv_sequence_length) {
              tileV[idx] = v[vOffset + (w + local_id.y) * uniforms.N];
            }`}
        ${h?`
            if (w + local_id.y < present_sequence_length) {
          present_value[presentValueOffset + (w + local_id.y) * uniforms.N] = tileV[idx];
        }`:""}
      }
     workgroupBarrier();
     for (var k: u32 = 0u; k < TILE_SIZE && w+k < total_sequence_length; k++) {
       value += tileQ[TILE_SIZE * local_id.y + k] * tileV[TILE_SIZE * k + local_id.x];
     }
     workgroupBarrier();
   }

   // we need to transpose output from BNSH_v to BSND_v
   if (m < uniforms.M && n < uniforms.N) {
     let outputIdx = batchIdx * uniforms.M * uniforms.v_hidden_size + m * uniforms.v_hidden_size
       + headIdx * uniforms.N + n;
     output[outputIdx] = value;
   }
  }`};return{name:"AttentionScore",shaderCache:{hint:`${i!==void 0};${e}`,inputDependencies:T},getRunData:()=>({outputs:k,dispatchGroup:S,programUniforms:$}),getShaderSource:I}},_r=(e,t,r,i,n,a,s,u,l,p,c=void 0,h=void 0)=>{let g=Math.min(e.outputCount,1+(s?1:0)+(u?1:0)),_=g>1?s:void 0,y=g>1?u:void 0,v=g>1?p.pastSequenceLength:0,S=v+p.kvSequenceLength,$=l&&R.size(l.dims)>0?l:void 0,w=[t,r];_&&R.size(_.dims)>0&&w.push(_),$&&w.push($),c&&w.push(c),h&&w.push(h);let T=e.compute(Tu(g,t,r,_,$,p,v,c,h),{inputs:w,outputs:g>1?[-1,1]:[-1]})[0];e.compute(ku(T,p.batchSize,p.numHeads,v,p.sequenceLength,S,c,h),{inputs:c&&h?[T,c,h]:[T],outputs:[]});let k=[T,i];y&&R.size(y.dims)>0&&k.push(y),c&&k.push(c),h&&k.push(h),e.compute(Iu(g,T,i,y,p,v,c,h),{inputs:k,outputs:g>1?[0,2]:[0]})},Eu=(e,t)=>{let r=[t.batchSize,t.numHeads,t.sequenceLength,t.headSize],i=t.sequenceLength,n=t.inputHiddenSize,a=t.headSize,s=12,u={x:Math.ceil(t.headSize/s),y:Math.ceil(t.sequenceLength/s),z:t.batchSize*t.numHeads},l=[e.inputs[0],e.inputs[1],e.inputs[2]],p=[{type:12,data:i},{type:12,data:n},{type:12,data:a},{type:12,data:t.numHeads},{type:12,data:t.headSize},{type:12,data:t.hiddenSize},{type:12,data:t.hiddenSize+t.hiddenSize+t.vHiddenSize}],c=h=>{let g=j("output_q",l[0].dataType,r),_=j("output_k",l[0].dataType,r),y=j("output_v",l[0].dataType,r),v=M("input",l[0].dataType,l[0].dims),S=M("weight",l[1].dataType,l[1].dims),$=M("bias",l[2].dataType,l[2].dims),w=v.type.storage,T=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}];return`
  const TILE_SIZE = ${s}u;
  var<workgroup> tileInput: array<${w}, ${s*s}>;
  var<workgroup> tileWeightQ: array<${w}, ${s*s}>;
  var<workgroup> tileWeightK: array<${w}, ${s*s}>;
  var<workgroup> tileWeightV: array<${w}, ${s*s}>;
  ${h.registerUniforms(T).declareVariables(v,S,$,g,_,y)}
  ${h.mainStart([s,s,1])}
    let batchIndex = workgroup_id.z / uniforms.num_heads;
    let headNumber = workgroup_id.z % uniforms.num_heads;
    let m = global_id.y;
    let n = global_id.x;

    let inputOffset = batchIndex * (uniforms.M * uniforms.K) + m * uniforms.K;
    let biasOffsetQ = headNumber * uniforms.head_size;
    let biasOffsetK = uniforms.hidden_size + biasOffsetQ;
    let biasOffsetV = uniforms.hidden_size + biasOffsetK;

    var valueQ = ${w}(0);
    var valueK = ${w}(0);
    var valueV = ${w}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileInput[TILE_SIZE * local_id.y + local_id.x] = input[inputOffset + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        let offset = n + (w + local_id.y) * uniforms.ldb;
        tileWeightQ[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetQ + offset];
        tileWeightK[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetK + offset];
        tileWeightV[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetV + offset];
      }
      workgroupBarrier();
      for (var k: u32 = 0u; k<TILE_SIZE && w+k < uniforms.K; k++) {
        let inputTileOffset = TILE_SIZE * local_id.y + k;
        let weightTileOffset = TILE_SIZE * k + local_id.x;
        valueQ += tileInput[inputTileOffset] * tileWeightQ[weightTileOffset];
        valueK += tileInput[inputTileOffset] * tileWeightK[weightTileOffset];
        valueV += tileInput[inputTileOffset] * tileWeightV[weightTileOffset];
      }

      workgroupBarrier();
    }

    let headOffset = (m * uniforms.N + n) % uniforms.head_size;
    valueQ += bias[headOffset + biasOffsetQ];
    valueK += bias[headOffset + biasOffsetK];
    valueV += bias[headOffset + biasOffsetV];

    let offset = workgroup_id.z * uniforms.M * uniforms.N;
    if (m < uniforms.M && n < uniforms.N) {
      let outputIdx = offset + m * uniforms.N + n;
      output_q[outputIdx] = valueQ;
      output_k[outputIdx] = valueK;
      output_v[outputIdx] = valueV;
    }
  }`};return e.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0}],dispatchGroup:u,programUniforms:p}),getShaderSource:c},{inputs:l,outputs:[-1,-1,-1]})},gc=(e,t)=>{let r=Su(e.inputs,t),[i,n,a]=Eu(e,r);return _r(e,i,n,a,e.inputs[4],void 0,void 0,void 0,e.inputs[5],r)}}),Cu,zu,Au,yc,P0=D(()=>{"use strict";Pe(),ee(),re(),xe(),ie(),Cu=(e,t)=>{if(!e||e.length!==5)throw new Error("BatchNormalization requires 5 inputs");let r=(i,n,a)=>{let s=n.length;if(s!==i.length)throw new Error(`${a}: num dimensions != ${s}`);n.forEach((u,l)=>{if(u!==i[l])throw new Error(`${a}: dim[${l}] do not match`)})};if(e[0].dims.length>1){let i=t.format==="NHWC"?t.spatial?e[0].dims.slice(-1):e[0].dims.slice(-1).concat(e[0].dims.slice(1,e[0].dims.length-1)):e[0].dims.slice(1,t.spatial?2:void 0);r(e[1].dims,i,"Invalid input scale"),r(e[2].dims,i,"Invalid input B"),r(e[3].dims,i,"Invalid input mean"),r(e[4].dims,i,"Invalid input var")}else r(e[1].dims,[1],"Invalid input scale"),r(e[2].dims,[1],"Invalid input B"),r(e[3].dims,[1],"Invalid input mean"),r(e[4].dims,[1],"Invalid input var")},zu=(e,t)=>{let{epsilon:r,spatial:i,format:n}=t,a=e[0].dims,s=i?ve(a[a.length-1]):1,u=n==="NHWC"&&a.length>1?s:1,l=R.size(a)/s,p=i,c=p?a.length:a,h=M("x",e[0].dataType,e[0].dims,s),g=M("scale",e[1].dataType,e[1].dims,u),_=M("bias",e[2].dataType,e[2].dims,u),y=M("inputMean",e[3].dataType,e[3].dims,u),v=M("inputVar",e[4].dataType,e[4].dims,u),S=j("y",e[0].dataType,c,s),$=()=>{let T="";if(i)T=`let cOffset = ${a.length===1?"0u":n==="NHWC"?`outputIndices[${a.length-1}] / ${s}`:"outputIndices[1]"};`;else if(n==="NCHW")T=`
            ${S.indicesSet("outputIndices","0","0")}
            let cOffset = ${S.indicesToOffset("outputIndices")};`;else{T=`var cIndices = ${g.type.indices}(0);
                       cIndices[0] = outputIndices[${a.length-1}];`;for(let k=1;k<g.rank;k++)T+=`cIndices[${k}] = outputIndices[${k}];`;T+=`let cOffset = ${g.indicesToOffset("cIndices")};`}return T},w=T=>`
  const epsilon = ${r};
  ${T.registerUniform("outputSize","u32").declareVariables(h,g,_,y,v,S)}
  ${T.mainStart()}
  ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${S.offsetToIndices(`global_idx * ${s}`)};
    ${$()}
    let scale = ${g.getByOffset("cOffset")};
    let bias = ${_.getByOffset("cOffset")};
    let inputMean = ${y.getByOffset("cOffset")};
    let inputVar = ${v.getByOffset("cOffset")};
    let x = ${h.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${S.setByOffset("global_idx","value")}
  }`;return{name:"BatchNormalization",shaderCache:{hint:`${t.epsilon}_${t.format}_${i}_${s}`,inputDependencies:p?["rank","type","type","type","type"]:void 0},getShaderSource:w,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:p?[{type:12,data:l},...Z(a)]:[{type:12,data:l}]})}},Au=e=>he(e),yc=(e,t)=>{let{inputs:r,outputCount:i}=e,n=Au({...t,outputCount:i});if(_e.webgpu.validateInputContent&&Cu(r,n),t.trainingMode)throw new Error("BatchNormalization trainingMode is not supported yet.");e.compute(zu(r,n))}}),Ou,Ru,_c,L0=D(()=>{"use strict";re(),ie(),Ou=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![320,640,1280].includes(e[0].dims[2]))throw new Error("number of channels should be 320, 640 or 1280");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},Ru=e=>{let t=e[0].dims,r=e[0].dims[2],i=R.size(t)/4,n=e[0].dataType,a=M("input",n,t,4),s=M("bias",n,[r],4),u=M("residual",n,t,4),l=j("output",n,t,4);return{name:"BiasAdd",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)}}),getShaderSource:p=>`
  const channels = ${r}u / 4;
  ${p.declareVariables(a,s,u,l)}

  ${p.mainStart()}
    ${p.guardAgainstOutOfBoundsWorkgroupSizes(i)}
    let value = ${a.getByOffset("global_idx")}
      + ${s.getByOffset("global_idx % channels")} + ${u.getByOffset("global_idx")};
    ${l.setByOffset("global_idx","value")}
  }`}},_c=e=>{Ou(e.inputs),e.compute(Ru(e.inputs))}}),Bu,ce,wc,$c,bc,vc,xc,Sc,kc,Tc,Ic,Mu,Ec,Cc,zc,Ac,hr,Oc,jr,Rc,Bc,Mc,Nc,Dc,Uc,Pc,Lc,qc,Wc,Vc,Gc,Hc,Fc,jc,Kc,Zc,Xi,Qc,Pn,Ln,Xc,Yc,Jc,Nu,Du,ef,ca=D(()=>{"use strict";ee(),re(),xe(),ie(),Bu=(e,t,r,i,n,a,s)=>{let u=Math.ceil(t/4),l="";typeof n=="string"?l=`${n}(a)`:l=n("a");let p=M("inputData",r,[u],4),c=j("outputData",i,[u],4),h=[{name:"vec_size",type:"u32"}];return s&&h.push(...s),`
      ${e.registerUniforms(h).declareVariables(p,c)}

  ${a??""}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${p.getByOffset("global_idx")};
    ${c.setByOffset("global_idx",l)}
  }`},ce=(e,t,r,i,n,a=e.dataType,s,u)=>{let l=[{type:12,data:Math.ceil(R.size(e.dims)/4)}];return s&&l.push(...s),{name:t,shaderCache:{hint:n,inputDependencies:["type"]},getShaderSource:p=>Bu(p,R.size(e.dims),e.dataType,a,r,i,u),getRunData:p=>({outputs:[{dims:e.dims,dataType:a}],dispatchGroup:{x:Math.ceil(R.size(p[0].dims)/64/4)},programUniforms:l})}},wc=e=>{e.compute(ce(e.inputs[0],"Abs","abs"))},$c=e=>{e.compute(ce(e.inputs[0],"Acos","acos"))},bc=e=>{e.compute(ce(e.inputs[0],"Acosh","acosh"))},vc=e=>{e.compute(ce(e.inputs[0],"Asin","asin"))},xc=e=>{e.compute(ce(e.inputs[0],"Asinh","asinh"))},Sc=e=>{e.compute(ce(e.inputs[0],"Atan","atan"))},kc=e=>{e.compute(ce(e.inputs[0],"Atanh","atanh"))},Tc=e=>he(e),Ic=(e,t)=>{let r;switch(t.to){case 10:r="vec4<f16>";break;case 1:r="vec4<f32>";break;case 12:r="vec4<u32>";break;case 6:r="vec4<i32>";break;case 9:r="vec4<bool>";break;default:throw new RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${t.to}`)}e.compute(ce(e.inputs[0],"Cast",r,void 0,t.cacheKey,t.to))},Mu=e=>{let t,r,i=e.length>=2&&e[1].data!==0,n=e.length>=3&&e[2].data!==0;switch(e[0].dataType){case 1:t=i?e[1].getFloat32Array()[0]:-34028234663852886e22,r=n?e[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:t=i?e[1].getUint16Array()[0]:64511,r=n?e[2].getUint16Array()[0]:31743;break;default:throw new Error("Unsupport data type")}return he({min:t,max:r})},Ec=(e,t)=>{let r=t||Mu(e.inputs),i=Ee(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"Clip",n=>`clamp(${n}, vec4<${i}>(uniforms.min), vec4<${i}>(uniforms.max))`,void 0,r.cacheKey,void 0,[{type:e.inputs[0].dataType,data:r.min},{type:e.inputs[0].dataType,data:r.max}],[{name:"min",type:i},{name:"max",type:i}]),{inputs:[0]})},Cc=e=>{e.compute(ce(e.inputs[0],"Ceil","ceil"))},zc=e=>{e.compute(ce(e.inputs[0],"Cos","cos"))},Ac=e=>{e.compute(ce(e.inputs[0],"Cosh","cosh"))},hr=e=>he(e),Oc=(e,t)=>{let r=Ee(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"Elu",i=>`elu_vf32(${i})`,`
  const elu_alpha_ = ${r}(${t.alpha});

  fn elu_f32(a: ${r}) -> ${r} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${r}>) -> vec4<${r}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,t.cacheKey))},jr=(e="f32")=>`
const r0: ${e} = 0.3275911;
const r1: ${e} = 0.254829592;
const r2: ${e} = -0.284496736;
const r3: ${e} = 1.421413741;
const r4: ${e} = -1.453152027;
const r5: ${e} = 1.061405429;

fn erf_vf32(v: vec4<${e}>) -> vec4<${e}> {
  let absv = abs(v);
  let x = 1.0 / (1.0 + r0 * absv);
  return sign(v) * (1.0 - ((((r5 * x + r4) * x + r3) * x + r2) * x + r1) * x * exp(-absv * absv));
}`,Rc=e=>{let t=Ee(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"Erf",r=>`erf_vf32(${r})`,jr(t)))},Bc=e=>{e.compute(ce(e.inputs[0],"Exp","exp"))},Mc=e=>{e.compute(ce(e.inputs[0],"Floor","floor"))},Nc=e=>{let t=Ee(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"Gelu",r=>`0.5 * ${r} * (1.0 + erf_vf32(${r} * 0.7071067811865475))`,jr(t)))},Dc=(e,t)=>{let r=Ee(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"LeakyRelu",i=>`select(leaky_relu_alpha_ * ${i}, ${i}, ${i} >= vec4<${r}>(0.0))`,`const leaky_relu_alpha_ = ${r}(${t.alpha});`,t.cacheKey))},Uc=e=>{e.compute(ce(e.inputs[0],"Not",t=>`!${t}`))},Pc=e=>{e.compute(ce(e.inputs[0],"Neg",t=>`-${t}`))},Lc=e=>{e.compute(ce(e.inputs[0],"Reciprocal",t=>`1.0/${t}`))},qc=e=>{let t=Ee(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"Relu",r=>`select(vec4<${t}>(0.0), ${r}, ${r} > vec4<${t}>(0.0))`))},Wc=e=>{e.compute(ce(e.inputs[0],"Sigmoid",t=>`(1.0 / (1.0 + exp(-${t})))`))},Vc=e=>he(e),Gc=(e,t)=>{let r=Ee(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"HardSigmoid",i=>`max(vec4<${r}>(0.0), min(vec4<${r}>(1.0), ${t.alpha} * ${i} + vec4<${r}>(${t.beta})))`,void 0,t.cacheKey))},Hc=e=>{let t=Ee(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"HardSwish",r=>`${r} * max(vec4<${t}>(0.0), min(vec4<${t}>(1.0), vec4<${t}>(${t}(1.0 / 6.0)) * ${r} + vec4<${t}>(0.5)))`))},Fc=e=>{e.compute(ce(e.inputs[0],"Sin","sin"))},jc=e=>{e.compute(ce(e.inputs[0],"Sinh","sinh"))},Kc=e=>{e.compute(ce(e.inputs[0],"Sqrt","sqrt"))},Zc=e=>{e.compute(ce(e.inputs[0],"Tan","tan"))},Xi=e=>`sign(${e}) * (1 - exp(-2 * abs(${e}))) / (1 + exp(-2 * abs(${e})))`,Qc=e=>{e.compute(ce(e.inputs[0],"Tanh",Xi))},Pn=(e="f32")=>`
const fast_gelu_a: ${e} = 0.5;
const fast_gelu_b: ${e} = 0.7978845608028654;
const fast_gelu_c: ${e} = 0.035677408136300125;

fn tanh_v(v: vec4<${e}>) -> vec4<${e}> {
  return ${Xi("v")};
}
`,Ln=e=>`(fast_gelu_a + fast_gelu_a * tanh_v(${e} * (fast_gelu_c * ${e} * ${e} + fast_gelu_b))) * ${e}`,Xc=e=>{let t=Ee(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"FastGelu",Ln,Pn(t),void 0,e.inputs[0].dataType))},Yc=(e,t)=>{let r=Ee(e.inputs[0].dataType);return e.compute(ce(e.inputs[0],"ThresholdedRelu",i=>`select(vec4<${r}>(0.0), ${i}, ${i} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${r}>(${t.alpha});`,t.cacheKey)),0},Jc=e=>{e.compute(ce(e.inputs[0],"Log","log"))},Nu=(e,t)=>`
const alpha = vec4<${e}>(${t});
const one = ${e}(1.0);
const zero = ${e}(0.0);

fn quick_gelu_impl(x: vec4<${e}>) -> vec4<${e}> {
  let v = x *alpha;
  var x1 : vec4<${e}>;
  for (var i = 0; i < 4; i = i + 1) {
    if (v[i] >= zero) {
      x1[i] = one / (one + exp(-v[i]));
    } else {
      x1[i] = one - one / (one + exp(v[i]));
    }
  }
  return x * x1;
}
`,Du=e=>`quick_gelu_impl(${e})`,ef=(e,t)=>{let r=Ee(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"QuickGelu",Du,Nu(r,t.alpha),t.cacheKey,e.inputs[0].dataType))}}),Uu,Pu,tf,q0=D(()=>{"use strict";re(),ie(),ca(),Uu=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![2560,5120,10240].includes(e[0].dims[2]))throw new Error("hidden state should be 2560, 5120 or 10240");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},Pu=e=>{let t=e[0].dims.slice();t[2]=t[2]/2;let r=M("input",e[0].dataType,e[0].dims,4),i=M("bias",e[0].dataType,[e[0].dims[2]],4),n=j("output",e[0].dataType,t,4),a=R.size(t)/4,s=Ce(e[0].dataType);return{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)}}),getShaderSource:u=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${e[0].dims[2]/4/2}u;

  ${u.declareVariables(r,i,n)}

  ${jr(s)}

  ${u.mainStart()}
    ${u.guardAgainstOutOfBoundsWorkgroupSizes(a)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${n.setByOffset("global_idx","valueLeft * geluRight")}
  }`}},tf=e=>{Uu(e.inputs),e.compute(Pu(e.inputs))}}),Lu,qu,Ze,rf,nf,af,sf,of,uf,lf,df,pf,cf,W0=D(()=>{"use strict";ee(),re(),ie(),Lu=(e,t,r,i,n,a,s,u,l,p,c,h)=>{let g,_;typeof u=="string"?g=_=(w,T)=>`${u}((${w}),(${T}))`:typeof u=="function"?g=_=u:(g=u.scalar,_=u.vector);let y=j("outputData",c,i.length,4),v=M("aData",l,t.length,4),S=M("bData",p,r.length,4),$;if(n)if(a){let w=R.size(t)===1,T=R.size(r)===1,k=t.length>0&&t[t.length-1]%4===0,I=r.length>0&&r[r.length-1]%4===0;w||T?$=y.setByOffset("global_idx",_(w?`${v.type.value}(${v.getByOffset("0")}.x)`:v.getByOffset("global_idx"),T?`${S.type.value}(${S.getByOffset("0")}.x)`:S.getByOffset("global_idx"))):$=`
            let outputIndices = ${y.offsetToIndices("global_idx * 4u")};
            let offsetA = ${v.broadcastedIndicesToOffset("outputIndices",y)};
            let offsetB = ${S.broadcastedIndicesToOffset("outputIndices",y)};
            ${y.setByOffset("global_idx",_(s||k?v.getByOffset("offsetA / 4u"):`${v.type.value}(${v.getByOffset("offsetA / 4u")}[offsetA % 4u])`,s||I?S.getByOffset("offsetB / 4u"):`${S.type.value}(${S.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else $=y.setByOffset("global_idx",_(v.getByOffset("global_idx"),S.getByOffset("global_idx")));else{if(!a)throw new Error("no necessary to use scalar implementation for element-wise binary op implementation.");let w=(T,k,I="")=>{let C=`aData[indexA${k}][componentA${k}]`,A=`bData[indexB${k}][componentB${k}]`;return`
            let outputIndices${k} = ${y.offsetToIndices(`global_idx * 4u + ${k}u`)};
            let offsetA${k} = ${v.broadcastedIndicesToOffset(`outputIndices${k}`,y)};
            let offsetB${k} = ${S.broadcastedIndicesToOffset(`outputIndices${k}`,y)};
            let indexA${k} = offsetA${k} / 4u;
            let indexB${k} = offsetB${k} / 4u;
            let componentA${k} = offsetA${k} % 4u;
            let componentB${k} = offsetB${k} % 4u;
            ${T}[${k}] = ${I}(${g(C,A)});
          `};c===9?$=`
            var data = vec4<u32>(0);
            ${w("data",0,"u32")}
            ${w("data",1,"u32")}
            ${w("data",2,"u32")}
            ${w("data",3,"u32")}
            outputData[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:$=`
            ${w("outputData[global_idx]",0)}
            ${w("outputData[global_idx]",1)}
            ${w("outputData[global_idx]",2)}
            ${w("outputData[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(v,S,y)}

        ${h??""}

        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${$}
      }`},qu=(e,t,r,i,n,a,s=r.dataType)=>{let u=r.dims.map(Number),l=i.dims.map(Number),p=!R.areEqual(u,l),c=u,h=R.size(u),g=!1,_=!1,y=[p];if(p){let v=jt.calcShape(u,l,!1);if(!v)throw new Error("Can't perform binary op on the given tensors");c=v.slice(),h=R.size(c);let S=R.size(u)===1,$=R.size(l)===1,w=u.length>0&&u[u.length-1]%4===0,T=l.length>0&&l[l.length-1]%4===0;y.push(S),y.push($),y.push(w),y.push(T);let k=1;for(let I=1;I<c.length;I++){let C=u[u.length-I],A=l[l.length-I];if(C===A)k*=C;else break}k%4===0?(_=!0,g=!0):(S||$||w||T)&&(g=!0)}else g=!0;return y.push(g),{name:e,shaderCache:{hint:t+y.map(v=>v.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:v=>Lu(v,u,l,c,g,p,_,n,r.dataType,i.dataType,s,a),getRunData:()=>({outputs:[{dims:c,dataType:s}],dispatchGroup:{x:Math.ceil(h/64/4)},programUniforms:[{type:12,data:Math.ceil(R.size(c)/4)},...Z(u,l,c)]})}},Ze=(e,t,r,i,n,a)=>{e.compute(qu(t,n??"",e.inputs[0],e.inputs[1],r,i,a))},rf=e=>{Ze(e,"Add",(t,r)=>`${t}+${r}`)},nf=e=>{Ze(e,"Div",(t,r)=>`${t}/${r}`)},af=e=>{Ze(e,"Equal",{scalar:(t,r)=>`u32(${t}==${r})`,vector:(t,r)=>`vec4<u32>(${t}==${r})`},void 0,void 0,9)},sf=e=>{Ze(e,"Mul",(t,r)=>`${t}*${r}`)},of=e=>{let t=M("input",e.inputs[0].dataType,e.inputs[0].dims).type.value;Ze(e,"Pow",{scalar:(r,i)=>`pow_custom(${r},${i})`,vector:(r,i)=>`pow_vector_custom(${r},${i})`},`
    fn pow_custom(a : ${t}, b : ${t}) -> ${t} {
      if (b == ${t}(0.0)) {
        return ${t}(1.0);
      } else if (a < ${t}(0.0) && f32(b) != floor(f32(b))) {
        return ${t}(pow(f32(a), f32(b))); // NaN
      }
      return select(sign(a), ${t}(1.0), round(f32(abs(b) % ${t}(2.0))) != 1.0) * ${t}(${t==="i32"?"round":""}(pow(f32(abs(a)), f32(b))));
    }
    fn pow_vector_custom(a : vec4<${t}>, b : vec4<${t}>) -> vec4<${t}> {
      // TODO: implement vectorized pow
      return vec4<${t}>(pow_custom(a.x, b.x), pow_custom(a.y, b.y), pow_custom(a.z, b.z), pow_custom(a.w, b.w));
    }
      `)},uf=e=>{Ze(e,"Sub",(t,r)=>`${t}-${r}`)},lf=e=>{Ze(e,"Greater",{scalar:(t,r)=>`u32(${t}>${r})`,vector:(t,r)=>`vec4<u32>(${t}>${r})`},void 0,void 0,9)},df=e=>{Ze(e,"Less",{scalar:(t,r)=>`u32(${t}<${r})`,vector:(t,r)=>`vec4<u32>(${t}<${r})`},void 0,void 0,9)},pf=e=>{Ze(e,"GreaterOrEqual",{scalar:(t,r)=>`u32(${t}>=${r})`,vector:(t,r)=>`vec4<u32>(${t}>=${r})`},void 0,void 0,9)},cf=e=>{Ze(e,"LessOrEqual",{scalar:(t,r)=>`u32(${t}<=${r})`,vector:(t,r)=>`vec4<u32>(${t}<=${r})`},void 0,void 0,9)}}),Wu,Vu,ff,hf,V0=D(()=>{"use strict";ee(),re(),xe(),ie(),Wu=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");let r=0,i=e[r],n=i.dataType,a=i.dims.length;e.forEach((s,u)=>{if(u!==r){if(s.dataType!==n)throw new Error("input tensors should be one type");if(s.dims.length!==a)throw new Error("input tensors should have the same shape");s.dims.forEach((l,p)=>{if(p!==t&&l!==i.dims[p])throw new Error("non concat dimensions must match")})}})},Vu=(e,t,r,i,n=0)=>{let a=e.reduce(($,w)=>$+R.size(w.dims),0),s=new Array(e.length),u=new Array(e.length),l=new Array(e.length),p=0,c=n,h=[],g=[],_=[{type:12,data:a}];for(let $=0;$<e.length;++$)s[$]=p,u[$]=c,p+=R.size(e[$].dims),c+=e[$].dims[t],g.push(e[$].dims.length),l[$]=M(`input${$}`,i,g[$]),h.push("rank"),_.push({type:12,data:s[$]}),_.push({type:12,data:u[$]});for(let $=0;$<e.length;++$)_.push(...Z(e[$].dims));_.push(...Z(r));let y=j("output",i,r.length),v=l.map(($,w)=>{let T=`
        let inputOffset = ${`global_idx - uniforms.inputOffset${w}`};
        var outputIndices = ${$.offsetToIndices("inputOffset")};
        ${y.indicesGet("outputIndices",t)} += uniforms.outputAxisOffset${w};
        ${y.setByIndices("outputIndices",$.getByOffset("inputOffset"))}`;return e.length===1?T:w===0?`if (inputIndex == 0u) {${T}}`:w===e.length-1?`else {${T}}`:`else if (inputIndex == ${w}u) {${T}}`}).join(`
`),S=$=>`

  ${(()=>{$.registerUniform("outputSize","u32");for(let w=0;w<e.length;w++)$.registerUniform(`inputOffset${w}`,"u32"),$.registerUniform(`outputAxisOffset${w}`,"u32");return $.declareVariables(...l,y)})()}

  fn calculateInputIndex(global_idx: u32) -> u32 {
    ${l.slice(1).map((w,T)=>`if (global_idx < uniforms.inputOffset${T+1}) {
      return ${T}u;
    }`).join(`
`)}
    return ${e.length-1}u;
  }

  ${$.mainStart()}
    ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    let inputIndex = calculateInputIndex(global_idx);
    ${v}
  }`;return{name:"Concat",shaderCache:{hint:`${t}`,inputDependencies:h},getRunData:()=>({outputs:[{dims:r,dataType:i}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:_}),getShaderSource:S}},ff=(e,t)=>{let r=e.inputs,i=r[0].dims,n=R.normalizeAxis(t.axis,i.length);Wu(r,n);let a=i.slice();a[n]=r.reduce((p,c)=>p+(c.dims.length>n?c.dims[n]:0),0);let s=r.filter(p=>R.size(p.dims)>0);if(s.length===0){e.output(0,a);return}let u=e.deviceLimits.maxStorageBuffersPerShaderStage-1,l=0;for(let p=0;p<s.length;p+=u){let c=s.slice(p,p+u);e.compute(Vu(c,n,a,r[0].dataType,l),{inputs:c,outputs:[0]}),l+=c.reduce((h,g)=>h+g.dims[n],0)}},hf=e=>he({axis:e.axis})}),Mt,Nt,Dt,fa,Pt=D(()=>{"use strict";ee(),re(),Mt=(e,t,r="f32")=>{switch(e.activation){case"Relu":return`value = max(value, ${t}(0.0));`;case"Sigmoid":return`value = (${t}(1.0) / (${t}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${t}(${r}(uniforms.clip_min)), ${t}(${r}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${t}(0.0), min(${t}(1.0), ${r}(uniforms.alpha) * value + ${r}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${r}(uniforms.alpha) * value, value, value >= ${t}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw new Error(`Unsupported activation ${e.activation}`)}},Nt=(e,t)=>{e.activation==="Clip"?t.push({type:1,data:e.clipMax},{type:1,data:e.clipMin}):e.activation==="HardSigmoid"?t.push({type:1,data:e.alpha},{type:1,data:e.beta}):e.activation==="LeakyRelu"&&t.push({type:1,data:e.alpha})},Dt=(e,t)=>{e.activation==="Clip"?t.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):e.activation==="HardSigmoid"?t.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):e.activation==="LeakyRelu"&&t.push({name:"alpha",type:"f32"})},fa=e=>{let t=e?.activation||"";if(t==="HardSigmoid"){let[r,i]=e?.activation_params||[.2,.5];return{activation:t,alpha:r,beta:i}}else if(t==="Clip"){let[r,i]=e?.activation_params||[Up,Pp];return{activation:t,clipMax:i,clipMin:r}}else if(t==="LeakyRelu"){let[r]=e?.activation_params||[.01];return{activation:t,alpha:r}}return{activation:t}}}),Re,mf,ha=D(()=>{"use strict";Re=(e,t)=>{switch(e){case 1:return t;case 2:return`vec2<${t}>`;case 3:return`vec3<${t}>`;case 4:return`vec4<${t}>`;default:throw new Error(`${e}-component is not supported.`)}},mf=e=>`
      ${e?"value = value + getBiasByOutputCoords(coords);":""}
      `}),gf,G0=D(()=>{"use strict";gf=e=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${e}.x), i32(${e}.y), i32(${e}.z), 1));
}
`}),gr,ma,ga=D(()=>{"use strict";ee(),re(),ie(),Pt(),gr=(e,t,r,i,n)=>{let a=i-r;return`
      ${Array.from({length:r}).map((s,u)=>`
      if (${K(t.shape,u,t.rank)} != 1) {
        ${t.indicesSet(e,u,K(n,u+a,i))}
      } else {
        ${t.indicesSet(e,u,0)}
      }`).join("")}
`},ma=(e,t,r,i,n=!1,a)=>{let s=e[0].dims,u=e[1].dims,l=s[s.length-2],p=u[u.length-1],c=s[s.length-1],h=ve(p),g=ve(c),_=ve(l),y=R.size(r)/h/_,v=e.length>2,S=i?i.slice(0,-2):r.slice(0,-2),$=[R.size(S),l,p],w=[{type:12,data:y},{type:12,data:l},{type:12,data:p},{type:12,data:c}];Nt(t,w),w.push(...Z(S,s,u)),v&&w.push(...Z(e[2].dims)),w.push(...Z($));let T=k=>{let I=la("batch_dims",e[0].dataType,S.length),C=M("a",e[0].dataType,s.length,g),A=M("b",e[1].dataType,u.length,h),x=j("output",e[0].dataType,$.length,h),N=Ce(x.type.tensor),L=Mt(t,x.type.value,N),X=[C,A],Q="";if(v){let W=n?h:1;X.push(M("bias",e[2].dataType,e[2].dims.length,W)),Q=`${n?`value += bias[col / ${W}];`:`value += ${x.type.value}(bias[row + i]);`}`}let J=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];Dt(t,J);let O=()=>{let W=`var a_data: ${C.type.value};`;for(let Y=0;Y<g;Y++)W+=`
              let b_data${Y} = b[(b_offset + (k + ${Y}) * uniforms.N + col) / ${h}];`;for(let Y=0;Y<_;Y++){W+=`a_data = a[(a_offset + (row + ${Y}) * uniforms.K + k) / ${g}];`;for(let P=0;P<g;P++)W+=`
            values[${Y}] = fma(${A.type.value}(a_data${g===1?"":`[${P}]`}), b_data${P}, values[${Y}]);
`}return W};return`
  ${k.registerUniforms(J).registerInternalVariables(I).declareVariables(...X,x)}
  ${k.mainStart()}
    ${k.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${h})) * ${h};
    var index1 = global_idx / (uniforms.N / ${h});
    let stride1 = uniforms.M / ${_};
    let row = (index1 % stride1) * ${_};
    let batch = index1 / stride1;

    ${r.length===2?"":`let batch_indices = ${I.offsetToIndices("batch")};`}

    var a_indices: ${C.type.indices};
    ${gr("a_indices",C,C.rank-2,I.rank,"batch_indices")}
    ${C.indicesSet("a_indices",C.rank-2,0)}
    ${C.indicesSet("a_indices",C.rank-1,0)}
    let a_offset = ${C.indicesToOffset("a_indices")};

    var b_indices: ${A.type.indices};
    ${gr("b_indices",A,A.rank-2,I.rank,"batch_indices")}
    ${A.indicesSet("b_indices",A.rank-2,0)}
    ${A.indicesSet("b_indices",A.rank-1,0)}
    let b_offset = ${A.indicesToOffset("b_indices")};
    var values: array<${x.type.value}, ${_}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${g}) {
      ${O()}
    }
    for (var i = 0u; i < ${_}u; i++) {
      var value = values[i];
      ${Q}
      ${L}
      let cur_indices = ${x.type.indices}(batch, row + i, col);
      let offset = ${x.indicesToOffset("cur_indices")};
      ${x.setByOffset(`offset / ${h}`,"value")};
    }
  }
  `};return{name:"MatMulNaive",shaderCache:{hint:`${t.activation};${h};${g};${_};${n}`,inputDependencies:v?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:a?a(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(y/64)},programUniforms:w}),getShaderSource:T}}}),Gu,Hu,qn,Yi,Fu,Wn,ju,ei,ya=D(()=>{"use strict";ee(),re(),ie(),Pt(),ga(),ha(),Gu=(e,t)=>e?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${t?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${t?", batchIndices":""});
        `,Hu=(e,t)=>e?`
        let ACached0 = mm_Asub[k * innerElementSize][localRow];
        let ACached1 = mm_Asub[k * innerElementSize + 1][localRow];
        let ACached2 = mm_Asub[k * innerElementSize + 2][localRow];
        ${t===3?"":"let ACached3 = mm_Asub[k * innerElementSize + 3][localRow];"}
        for (var i = 0; i < rowPerThread; i = i + 1) {
          acc[i] = BCached0 * ACached0[i] + acc[i];
          acc[i] = BCached1 * ACached1[i] + acc[i];
          acc[i] = BCached2 * ACached2[i] + acc[i];
          ${t===3?"":"acc[i] = BCached3 * ACached3[i] + acc[i];"}
        }`:`
        for (var i = 0; i < rowPerThread; i = i + 1) {
          let ACached = mm_Asub[tileRow + i][k];
          acc[i] = BCached0 * ACached.x + acc[i];
          acc[i] = BCached1 * ACached.y + acc[i];
          acc[i] = BCached2 * ACached.z + acc[i];
          ${t===3?"":"acc[i] = BCached3 * ACached.w + acc[i];"}
        }`,qn=(e,t,r="f32",i,n=!1,a=32,s=!1,u=32)=>{let l=t[1]*e[1],p=t[0]*e[0],c=n?l:a,h=n?a:l,g=c/t[0],_=a/t[1];if(!((n&&g===4&&e[1]===4||!n&&(g===3||g===4))&&c%t[0]===0&&a%t[1]===0&&e[0]===4))throw new Error(`If transposeA ${n} is true, innerElementSize ${g} and workPerThread[1] ${e[1]} must be 4.
      Otherwise, innerElementSize ${g} must be 3 or 4.
  tileAWidth ${c} must be divisible by workgroupSize[0]${t[0]}. tileInner ${a} must be divisible by workgroupSize[1] ${t[1]}. colPerThread ${e[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${g}<${r}>, ${c/g}>, ${h}>;
var<workgroup> mm_Bsub: array<array<vec4<${r}>, ${p/e[0]}>, ${a}>;

const rowPerThread = ${e[1]};
const colPerThread = ${e[0]};
const innerElementSize = ${g};
const tileInner = ${a};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
  let localRow = i32(localId.y);
  let tileRow = localRow * rowPerThread;
  let tileCol = i32(localId.x);

  let globalRow =i32(globalId.y) * rowPerThread;
  let globalCol = i32(globalId.x);
  let batch = ${s?"0":"i32(globalId.z)"};
  ${i?`let batchIndices = ${i.offsetToIndices("u32(batch)")};`:""}
  let globalRowStart = i32(workgroupId.y) * ${l};

  let num_tiles = ${s?`${Math.ceil(u/a)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
  var kStart = ${s?`i32(globalId.z) * ${u}`:"0"};

  var acc: array<vec4<${r}>, rowPerThread>;

  // Loop over shared dimension.
  let tileRowB = localRow * ${_};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${Gu(n,i)}
      }

      // Load one tile of B into local memory.
      for (var innerRow = 0; innerRow < ${_}; innerRow = innerRow + 1) {
          let inputRow = tileRowB + innerRow;
          let inputCol = tileCol;
          mm_Bsub[inputRow][inputCol] = mm_readB(batch, kStart + inputRow, globalCol${i?", batchIndices":""});
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      for (var k = 0; k < tileInner / innerElementSize; k = k + 1) {
          let BCached0 = mm_Bsub[k * innerElementSize][tileCol];
          let BCached1 = mm_Bsub[k * innerElementSize + 1][tileCol];
          let BCached2 = mm_Bsub[k * innerElementSize + 2][tileCol];
          ${g===3?"":"let BCached3 = mm_Bsub[k * innerElementSize + 3][tileCol];"}

          ${Hu(n,g)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},Yi=(e,t)=>e?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${t?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${t?", batchIndices":""});
            `,Fu=e=>e?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];",Wn=(e,t,r="f32",i,n=!1,a=32,s=!1,u=32,l=!1)=>{let p=e[1]*t[1],c=e[0]*t[0],h=n?p:a,g=n?a:p;if(!(g%t[1]===0&&h%t[0]===0&&a%t[1]===0))throw new Error(`tileAHight ${g} must be divisible by workgroupSize[1]${t[1]}, tileAWidth ${h} must be divisible by workgroupSize[0]${t[0]}, tileInner ${a} must be divisible by workgroupSize[1]${t[1]}`);let _=g/t[1],y=h/t[0],v=a/t[1],S=l?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${p};
    let globalColStart = i32(workgroupId.x) * ${c};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${g}; inputRow = inputRow + ${t[1]}) {
        for (var inputCol = localCol; inputCol < ${h}; inputCol = inputCol + ${t[0]}) {
          ${Yi(n,i)}
        }
      }
      // Load one tile of B into local memory.
      for (var inputRow = localRow; inputRow < ${a}; inputRow = inputRow + ${t[1]}) {
            for (var inputCol = localCol; inputCol < ${c}; inputCol = inputCol + ${t[0]}) {
          mm_Bsub[inputRow][inputCol] = mm_readB(batch,
            kStart + inputRow,
            globalColStart + inputCol${i?", batchIndices":""});
        }
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      var BCached : array<${r}, colPerThread>;
      for (var k = 0; k < tileInner; k = k + 1) {
        for (var inner = 0; inner < colPerThread; inner = inner + 1) {
          BCached[inner] = mm_Bsub[k][localCol + inner * ${t[0]}];
        }
        for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let ACached = ${n?`mm_Asub[k][localRow + innerRow * ${t[1]}];`:`mm_Asub[localRow + innerRow * ${t[1]}][k];`}
          for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
            acc[innerRow][innerCol] = acc[innerRow][innerCol] +
                ACached * BCached[innerCol];
          }
        }
      }
      workgroupBarrier();
    }
    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      let gRow = globalRowStart + localRow + innerRow * ${t[1]};
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        let gCol = globalColStart + localCol + innerCol * ${t[0]};
        mm_write(batch, gRow, gCol, acc[innerRow][innerCol]);
      }
    }
    `:`
let tileRow = i32(localId.y) * rowPerThread;
let tileCol = i32(localId.x) * colPerThread;

let globalRow = i32(globalId.y) * rowPerThread;
let globalCol = i32(globalId.x) * colPerThread;
let globalRowStart = i32(workgroupId.y) * ${p};

let tileRowA = i32(localId.y) * ${_};
let tileColA = i32(localId.x) * ${y};
let tileRowB = i32(localId.y) * ${v};
// Loop over shared dimension.
for (var t = 0; t < num_tiles; t = t + 1) {
  // Load one tile of A into local memory.
  for (var innerRow = 0; innerRow < ${_}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < ${y}; innerCol = innerCol + 1) {
      let inputRow = tileRowA + innerRow;
      let inputCol = tileColA + innerCol;
      ${Yi(n,i)}
    }
  }

  // Load one tile of B into local memory.
  for (var innerRow = 0; innerRow < ${v}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
      let inputRow = tileRowB + innerRow;
      let inputCol = tileCol + innerCol;
      mm_Bsub[inputRow][inputCol] = mm_readB(batch,
        kStart + inputRow,
        globalCol + innerCol${i?", batchIndices":""});
    }
  }
  kStart = kStart + tileInner;
  workgroupBarrier();

  // Compute acc values for a single thread.
  var BCached : array<${r}, colPerThread>;
  for (var k = 0; k < tileInner; k = k + 1) {
    for (var inner = 0; inner < colPerThread; inner = inner + 1) {
      BCached[inner] = mm_Bsub[k][tileCol + inner];
    }

    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      ${Fu(n)}
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        acc[innerRow][innerCol] = acc[innerRow][innerCol] + ACached * BCached[innerCol];
      }
    }
  }

  workgroupBarrier();
}

for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
  for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
    mm_write(batch, globalRow + innerRow, globalCol + innerCol,
        acc[innerRow][innerCol]);
  }
}
`;return`
  var<workgroup> mm_Asub : array<array<${r}, ${h}>, ${g}>;
  var<workgroup> mm_Bsub : array<array<${r}, ${c}>, ${a}>;
  const rowPerThread = ${e[1]};
  const colPerThread = ${e[0]};
  const tileInner = ${a};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
    let batch = ${s?"0":"i32(globalId.z)"};
    ${i?`let batchIndices = ${i.offsetToIndices("u32(batch)")};`:""}
    let num_tiles = ${s?`${Math.ceil(u/a)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
    var kStart = ${s?`i32(globalId.z) * ${u}`:"0"};

    var acc : array<array<${r}, colPerThread>, rowPerThread>;
    ${S}
  }
`},ju=(e,t,r,i,n=!1)=>{let[a,s,u,l]=i,p=Ce(i[0].type.tensor);return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${a.type.indices}) -> ${Re(e,p)} {
      var value = ${Re(e,p)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        var aIndices: ${s.type.indices};
        ${gr("aIndices",s,s.rank-2,a.rank,"batchIndices")}
        ${s.indicesSet("aIndices",s.rank-2,"u32(row)")}
        ${s.indicesSet("aIndices",s.rank-1,"u32(colIn)")}
        value = ${s.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${a.type.indices}) -> ${Re(e,p)} {
      var value = ${Re(e,p)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        var bIndices: ${u.type.indices};
        ${gr("bIndices",u,u.rank-2,a.rank,"batchIndices")}
        ${u.indicesSet("bIndices",u.rank-2,"u32(row)")}
        ${u.indicesSet("bIndices",u.rank-1,"u32(colIn)")}
        value = ${u.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${Re(e,p)}) {
      let col = colIn * ${e};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${t?`value = value + ${n?"bias[colIn]":`${Re(e,p)}(bias[row])`};`:""}
        ${r}
        ${l.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `},ei=(e,t,r,i,n=!1,a)=>{let s=e[0].dims,u=e[1].dims,l=s.slice(0,-2),p=u.slice(0,-2),c=i?i.slice(0,-2):r.slice(0,-2),h=R.size(c),g=s[s.length-2],_=s[s.length-1],y=u[u.length-1],v=_%4===0&&y%4===0,S=g<=8?[4,1,1]:[4,4,1],$=[8,8,1],w=[Math.ceil(y/$[0]/S[0]),Math.ceil(g/$[1]/S[1]),Math.ceil(h/$[2]/S[2])],T=v?4:1,k=[...l,g,_/T],I=k.length,C=[...p,_,y/T],A=C.length,x=[h,g,y/T],N=[{type:6,data:g},{type:6,data:y},{type:6,data:_}];Nt(t,N),N.push(...Z(c,k,C));let L=["rank","rank"],X=e.length>2;X&&(N.push(...Z(e[2].dims)),L.push("rank")),N.push(...Z(x));let Q=J=>{let O=c.length,W=la("batchDims",e[0].dataType,O,1),Y=Ce(e[0].dataType),P=M("a",e[0].dataType,I,T),se=M("b",e[1].dataType,A,T),ne=j("result",e[0].dataType,x.length,T),te=[P,se];if(X){let Se=n?T:1;te.push(M("bias",e[2].dataType,e[2].dims.length,Se))}let U=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];Dt(t,U);let H=Ce(ne.type.tensor),F=Mt(t,ne.type.value,H),V=ju(T,X,F,[W,P,se,ne],n);return`
  ${J.registerUniforms(U).registerInternalVariables(W).declareVariables(...te,ne)}
  ${V}
  ${v?qn(S,$,Y,W):Wn(S,$,Y,W)}
                   `};return{name:"MatMul",shaderCache:{hint:`${S};${t.activation};${v};${n}`,inputDependencies:L},getRunData:()=>({outputs:[{dims:a?a(r):r,dataType:e[0].dataType}],dispatchGroup:{x:w[0],y:w[1],z:w[2]},programUniforms:N}),getShaderSource:Q}}}),Ku,yf,H0=D(()=>{"use strict";ee(),dt(),ie(),Pt(),ha(),G0(),ya(),Ku=(e,t,r,i,n=!1,a,s=4,u=4,l=4,p="f32")=>{let c=N=>{switch(N){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${p}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw new Error(`innerElementSize ${N} is not supported.`)}},h=N=>{switch(N){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw new Error(`innerElementSize ${N} is not supported.`)}},g=e?`
    let coord = vec4<i32>(batch, xRow, xCol, xCh);
    `:`
    let coord = vec4<i32>(batch, xCh, xRow, xCol);
    `,_=e?`
    let coords = vec4<i32>(
      batch,
      row / outWidth,
      row % outWidth,
      col);
    `:`
    let coords = vec4<i32>(
      batch,
      row,
      col / outWidth,
      col % outWidth);
    `,y=e?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",v=e?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",S=e?"row":"col",$=e?"col":"row",w=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${S} / outWidth;
    let outCol = ${S} % outWidth;

    let WRow = ${$} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${$} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${$} % inChannels;
    var resData = ${Re(s,p)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${y} && xCol >= 0 && xCol < ${v}) {
      ${g}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${c(s)}
    }
    return resData;`,T=e?t&&i?`
    let col = colIn * ${s};
    ${w}`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${w}
    }
    return ${Re(s,p)}(0.0);`:i&&r?`
    let col = colIn * ${s};
    ${w}`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${w}
    }
    return ${Re(s,p)}(0.0);`,k=e?i&&r?h(u):`
    let col = colIn * ${u};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${h(u)}
    }
    return ${Re(u,p)}(0.0);`:`
    let col = colIn * ${u};
    if (row < uniforms.dim_inner && col < uniforms.dim_a_outer) {
      ${h(u)}
    }
    return ${Re(u,p)}(0.0);`,I=Re(l,p),C=Re(e?s:u,p),A=Re(e?u:s,p),x=Mt(a,I,p);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${C} {
      ${e?T:k}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${A} {
      ${e?k:T}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${I}) {
      let col = colIn * ${l};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${_}
      ${mf(n)}
      ${x}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},yf=(e,t,r,i,n,a,s,u,l)=>{let p=t.format==="NHWC",c=p?e[0].dims[3]:e[0].dims[1],h=r[0],g=p?r[2]:r[3],_=p?r[1]:r[2],y=p?r[3]:r[1],v=p&&(c%4===0||c%3===0)&&y%4===0,S=p?y:g*_,$=p?g*_:y,w=[8,8,1],T=i<=8?[4,1,1]:[4,4,1],k=[Math.ceil(S/w[0]/T[0]),Math.ceil($/w[1]/T[1]),Math.ceil(h/w[2]/T[2])];de("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${k}`);let I=v?p&&c%4!==0?3:4:1,C=w[1]*T[1],A=w[0]*T[0],x=Math.max(w[0]*I,w[1]),N=i%C===0,L=n%A===0,X=a%x===0,Q=v?[I,4,4]:[1,1,1],J=[{type:6,data:i},{type:6,data:n},{type:6,data:a},{type:6,data:[t.pads[0],t.pads[1]]},{type:6,data:t.strides},{type:6,data:t.dilations}];Nt(t,J),J.push(...Z(e[0].dims,e[1].dims));let O=["rank","rank"];s&&(J.push(...Z(e[2].dims)),O.push("rank")),J.push(...Z(r));let W=Y=>{let P=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];Dt(t,P);let se=v?4:1,ne=Ce(e[0].dataType),te=`
      fn setOutputAtIndex(flatIndex : i32, value : ${v?`vec4<${ne}>`:ne}) {
        result[flatIndex] = ${v?`vec4<${ne}>`:ne}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${v?`vec4<${ne}>`:ne}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${v?"/ 4":""}, value);
      }`,U=M("x",e[0].dataType,e[0].dims.length,I===3?1:I),H=M("w",e[1].dataType,e[1].dims.length,se),F=[U,H],V=j("result",e[0].dataType,r.length,se);if(s){let Se=M("bias",e[2].dataType,e[2].dims.length,se);F.push(Se),te+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${v?`vec4<${ne}>`:ne} {
          return bias[coords.${p?"w":"y"}${v?"/ 4":""}];
        }`}return`
        ${gf("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${Y.registerUniforms(P).declareVariables(...F,V)}
        ${te}
        ${Ku(p,N,L,X,s,t,Q[0],Q[1],Q[2],ne)}
        ${v?qn(T,w,ne,void 0,!p,x):Wn(T,w,ne,void 0,!p,x,!1,void 0,u)}`};return{name:"Conv2DMatMul",shaderCache:{hint:`${t.cacheKey};${I};${v};${N};${L};${X};${C};${A};${x}`,inputDependencies:O},getRunData:()=>({outputs:[{dims:l?l(r):r,dataType:e[0].dataType}],dispatchGroup:{x:k[0],y:k[1],z:k[2]},programUniforms:J}),getShaderSource:W}}}),Zu,Ji,nr,Qu,en,Xu,_f,wf,F0=D(()=>{"use strict";ee(),dt(),re(),ie(),Pt(),ha(),Zu=e=>{let t=1;for(let r=0;r<e.length;r++)t*=e[r];return t},Ji=e=>typeof e=="number"?[e,e,e]:e,nr=(e,t)=>t<=1?e:e+(e-1)*(t-1),Qu=(e,t,r,i=1)=>{let n=nr(t,i);return Math.floor((e[0]*(r-1)-r+n)/2)},en=(e,t,r,i,n)=>{n==null&&(n=Qu(e,t[0],i[0]));let a=[0,0,0,r];for(let s=0;s<3;s++)e[s]+2*n>=t[s]&&(a[s]=Math.trunc((e[s]-t[s]+2*n)/i[s]+1));return a},Xu=(e,t,r,i,n,a,s,u,l,p)=>{let c,h,g,_;if(e==="VALID"&&(e=0),typeof e=="number"){c={top:e,bottom:e,left:e,right:e,front:e,back:e};let y=en([t,r,i,1],[u,l,p],1,[n,a,s],e);h=y[0],g=y[1],_=y[2]}else if(Array.isArray(e)){if(!e.every((v,S,$)=>v===$[0]))throw Error(`Unsupported padding parameter: ${e}`);c={top:e[0],bottom:e[1],left:e[2],right:e[3],front:e[4],back:e[5]};let y=en([t,r,i,1],[u,l,p],1,[n,a,s],e[0]);h=y[0],g=y[1],_=y[2]}else if(e==="SAME_UPPER"){h=Math.ceil(t/n),g=Math.ceil(r/a),_=Math.ceil(i/s);let y=(h-1)*n+u-t,v=(g-1)*a+l-r,S=(_-1)*s+p-i,$=Math.floor(y/2),w=y-$,T=Math.floor(v/2),k=v-T,I=Math.floor(S/2),C=S-I;c={top:T,bottom:k,left:I,right:C,front:$,back:w}}else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:c,outDepth:h,outHeight:g,outWidth:_}},_f=(e,t,r,i,n,a=!1,s="channelsLast")=>{let u,l,p,c,h;if(s==="channelsLast")[u,l,p,c,h]=e;else if(s==="channelsFirst")[u,h,l,p,c]=e;else throw new Error(`Unknown dataFormat ${s}`);let[g,,_,y,v]=t,[S,$,w]=Ji(r),[T,k,I]=Ji(i),C=nr(_,T),A=nr(y,k),x=nr(v,I),{padInfo:N,outDepth:L,outHeight:X,outWidth:Q}=Xu(n,l,p,c,S,$,w,C,A,x),J=a?g*h:g,O=[0,0,0,0,0];return s==="channelsFirst"?O=[u,J,L,X,Q]:s==="channelsLast"&&(O=[u,L,X,Q,J]),{batchSize:u,dataFormat:s,inDepth:l,inHeight:p,inWidth:c,inChannels:h,outDepth:L,outHeight:X,outWidth:Q,outChannels:J,padInfo:N,strideDepth:S,strideHeight:$,strideWidth:w,filterDepth:_,filterHeight:y,filterWidth:v,effectiveFilterDepth:C,effectiveFilterHeight:A,effectiveFilterWidth:x,dilationDepth:T,dilationHeight:k,dilationWidth:I,inShape:e,outShape:O,filterShape:t}},wf=(e,t,r,i,n,a)=>{let s=a==="channelsLast",u=s?e[0].dims[3]:e[0].dims[1],l=!1,p=[64,1,1],c={x:r.map((w,T)=>T)},h=[Math.ceil(Zu(c.x.map(w=>r[w]))/p[0]),1,1];de("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${h}`);let g=l?s&&u%4!==0?3:4:1,_=R.size(r),y=[{type:12,data:_},{type:12,data:i},{type:12,data:n},{type:12,data:t.strides},{type:12,data:t.dilations}];Nt(t,y),y.push(...Z(e[0].dims,e[1].dims));let v=["rank","rank"],S=e.length===3;S&&(y.push(...Z(e[2].dims)),v.push("rank")),y.push(...Z(r));let $=w=>{let T=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:i.length},{name:"pads",type:"u32",length:n.length},{name:"strides",type:"u32",length:t.strides.length},{name:"dilations",type:"u32",length:t.dilations.length}];Dt(t,T);let k=l?4:1,I=Ce(e[0].dataType),C=M("x",e[0].dataType,e[0].dims.length,g===3?1:g),A=M("W",e[1].dataType,e[1].dims.length,k),x=[C,A],N=j("result",e[0].dataType,r.length,k),L="";if(S){let J=M("bias",e[2].dataType,e[2].dims.length,k);x.push(J),L+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${l?`vec4<${I}>`:I} {
          return bias[${s?K("coords",4,5):K("coords",1,5)}${l?"/ 4":""}];
        }`}let X=Re(g,I),Q=Mt(t,X,I);return`
            ${L}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> ${I} {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${C.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> ${I} {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${A.getByIndices("aIndices")};
            }
          ${w.registerUniforms(T).declareVariables(...x,N)}
          ${w.mainStart()}
          ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${N.offsetToIndices("global_idx")};
              let batch = ${K("coords",0,C.rank)};
              let d2 = ${s?K("coords",C.rank-1,C.rank):K("coords",1,C.rank)};
              let xFRCCorner = vec3<u32>(${s?K("coords",1,C.rank):K("coords",2,C.rank)},
              ${s?K("coords",2,C.rank):K("coords",3,C.rank)},
              ${s?K("coords",3,C.rank):K("coords",4,C.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${s?K("uniforms.x_shape",1,C.rank):K("uniforms.x_shape",2,C.rank)};
              let xShapeZ = ${s?K("uniforms.x_shape",2,C.rank):K("uniforms.x_shape",3,C.rank)};
              let xShapeW = ${s?K("uniforms.x_shape",3,C.rank):K("uniforms.x_shape",4,C.rank)};
              let xShapeU = ${s?K("uniforms.x_shape",4,C.rank):K("uniforms.x_shape",1,C.rank)};
              let inputDepthNearestVec4 = (xShapeU / 4) * 4;
              let inputDepthVec4Remainder = xShapeU % 4;

              var value = ${I}(0);
              for (var wF = 0u; wF < uniforms.filter_dims[0]; wF++) {
                let xF = xFCorner + wF * uniforms.dilations[0];
                if (xF < 0 || xF >= xShapeY) {
                  continue;
                }

                for (var wR = 0u; wR < uniforms.filter_dims[1]; wR++) {
                  let xR = xRCorner + wR * uniforms.dilations[1];
                  if (xR < 0 || xR >= xShapeZ) {
                    continue;
                  }

                  for (var wC = 0u; wC < uniforms.filter_dims[2]; wC++) {
                    let xC = xCCorner + wC * uniforms.dilations[2];
                    if (xC < 0 || xC >= xShapeW) {
                      continue;
                    }

                    for (var d1 = 0u; d1 < inputDepthNearestVec4; d1 += 4) {
                      ${s?`let xValues = vec4<${I}>(
                               getX(batch, xF, xR, xC, d1),
                               getX(batch, xF, xR, xC, d1 + 1),
                               getX(batch, xF, xR, xC, d1 + 2),
                               getX(batch, xF, xR, xC, d1 + 3));
                            `:`let xValues = vec4<${I}>(
                               getX(batch, d1, xF, xR, xC),
                               getX(batch, d1 + 1, xF, xR, xC),
                               getX(batch, d1 + 2, xF, xR, xC),
                               getX(batch, d1 + 3, xF, xR, xC));
                            `}
                            let wValues = vec4<${I}>(
                              getW(d2, d1, wF, wR, wC),
                              getW(d2, d1 + 1, wF, wR, wC),
                              getW(d2, d1 + 2, wF, wR, wC),
                              getW(d2, d1 + 3, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                    if (inputDepthVec4Remainder == 1) {
                        ${s?`value += getX(batch, xF, xR, xC, inputDepthNearestVec4)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`:`value += getX(batch, inputDepthNearestVec4, xF, xR, xC)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`}
                    } else if (inputDepthVec4Remainder == 2) {
                      ${s?`let xValues = vec2<${I}>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1));
                      `:`let xValues = vec2<${I}>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC));
                    `}
                    let wValues = vec2<${I}>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC));
                      value += dot(xValues, wValues);
                    } else if (inputDepthVec4Remainder == 3) {
                      ${s?`let xValues = vec3<${I}>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 2));
                      `:`let xValues = vec3<${I}>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 2, xF, xR, xC));
                    `}
                    let wValues = vec3<${I}>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 2, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                  }
                }
              }
              ${S?"value = value + getBiasByOutputCoords(coords)":""};
              ${Q}
              result[global_idx] = ${I}(value);
          }`};return{name:"Conv3DNaive",shaderCache:{hint:`${t.cacheKey};${s};${g};${S}`,inputDependencies:v},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:h[0],y:h[1],z:h[2]},programUniforms:y}),getShaderSource:$}}}),$f,bf,j0=D(()=>{"use strict";ee(),re(),ie(),Pt(),$f=(e,t,r,i)=>{let n=e.length>2,a=n?"value += b[output_channel];":"",s=e[0].dims,u=e[1].dims,l=t.format==="NHWC",p=l?r[3]:r[1],c=p/t.group,h=l&&c>=4?ve(p):1,g=R.size(r)/h,_=[{type:12,data:g},{type:12,data:t.dilations},{type:12,data:[t.strides[0],t.strides[1]]},{type:12,data:[t.pads[0],t.pads[1]]},{type:12,data:c}];Nt(t,_),_.push(...Z(s,[u[0],u[1],u[2],u[3]/h]));let y=n?["rank","rank","rank"]:["rank","rank"];_.push(...Z([r[0],r[1],r[2],r[3]/h]));let v=S=>{let $=j("output",e[0].dataType,r.length,h),w=Ce($.type.tensor),T=Mt(t,$.type.value,w),k=M("x",e[0].dataType,s.length),I=M("w",e[1].dataType,u.length,h),C=[k,I];n&&C.push(M("b",e[2].dataType,e[2].dims,h));let A=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:t.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];Dt(t,A);let x=l?`
      for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[0]; wHeight++) {
        let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

        if (xHeight < 0u || xHeight >= uniforms.x_shape[1]) {
          continue;
        }

        for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[1]; wWidth++) {
          let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
          if (xWidth < 0u || xWidth >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[2]; wInChannel++) {
            let input_channel = in_channel_offset + wInChannel;
            let xVal = ${k.get("batch","xHeight","xWidth","input_channel")};
            let wVal = ${I.get("wHeight","wWidth","wInChannel","output_channel")};
            value += xVal * wVal;
          }
        }
      }
      `:`
      for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[1]; wInChannel++) {
        let input_channel = in_channel_offset + wInChannel;
        for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[2]; wHeight++) {
          let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

          if (xHeight < 0u || xHeight >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[3]; wWidth++) {
            let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
            if (xWidth < 0u || xWidth >= uniforms.x_shape[3]) {
              continue;
            }

            let xVal = ${k.get("batch","input_channel","xHeight","xWidth")};
            let wVal = ${I.get("output_channel","wInChannel","wHeight","wWidth")};
            value += xVal * wVal;
          }
        }
      }
      `;return`
  ${S.registerUniforms(A).declareVariables(...C,$)}

  ${S.mainStart()}
    ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${$.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${l?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${l?1:2}], outputIndices[${l?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${h} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${l?2:1}];

    var value: ${$.type.value} = ${$.type.value}(0);
    ${x}
    ${a}
    ${T}
    ${$.setByOffset("global_idx","value")}
  }`};return{name:"GroupedConv",shaderCache:{hint:`${t.cacheKey}_${h}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:i?i(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:_}),getShaderSource:v}},bf=(e,t,r,i)=>{let n=e.length>2,a=ve(r[3]),s=ve(r[2]),u=R.size(r)/a/s,l=[e[0].dims[0],e[0].dims[1],e[0].dims[2],e[0].dims[3]/a],p=[e[1].dims[0],e[1].dims[1],e[1].dims[2],e[1].dims[3]/a],c=[r[0],r[1],r[2],r[3]/a],h=[{type:12,data:u},{type:6,data:[t.strides[0],t.strides[1]]},{type:6,data:[t.pads[0],t.pads[1]]}];Nt(t,h),h.push(...Z(l,p,c));let g=(s-1)*t.strides[1]+p[1],_=y=>{let v=j("output",e[0].dataType,c.length,a),S=Ce(v.type.tensor),$=Mt(t,v.type.value,S),w=M("x",e[0].dataType,l.length,a),T=M("w",e[1].dataType,p.length,a),k=[w,T];n&&k.push(M("b",e[2].dataType,e[2].dims,a));let I=n?"value += b[output_channel];":"",C=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return Dt(t,C),`
  ${y.registerUniforms(C).declareVariables(...k,v)}
  ${y.mainStart()}
    ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let width0 = uniforms.output_shape[3];
    let output_channel = global_idx % width0;
    var index1 = global_idx / width0;
    let width1 = uniforms.output_shape[2] / ${s}u;
    let col = (index1 % width1) * ${s}u;
    index1 = index1 / width1;
    let row = index1 % uniforms.output_shape[1];
    let batch = index1 / uniforms.output_shape[1];

    let x_corner = vec2<i32>(i32(row), i32(col)) * uniforms.strides - uniforms.pads;

    var x_vals: array<${w.type.value}, ${g}>;
    var values: array<${v.type.value}, ${s}>;
    let input_channel = output_channel;
    // Use constant instead of uniform can give better performance for w's height/width.
    for (var w_height: u32 = 0u; w_height < ${p[0]}; w_height++) {
      let x_height = x_corner.x + i32(w_height);
      if (x_height >= 0 && u32(x_height) < uniforms.x_shape[1]) {
        for (var i = 0; i < ${g}; i++) {
          let x_width = x_corner.y + i;
          if (x_width >= 0 && u32(x_width) < uniforms.x_shape[2]) {
            x_vals[i] = ${w.get("batch","u32(x_height)","u32(x_width)","input_channel")};
          } else {
            x_vals[i] = ${w.type.value}(0);
          }
        }
        for (var w_width: u32 = 0u; w_width < ${p[1]}; w_width++) {
          let w_val = ${T.get("w_height","w_width","0","output_channel")};
          for (var i = 0u; i < ${s}u; i++) {
            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);
          }
        }
      }
    }

    for (var i = 0u; i < ${s}u; i++) {
      var value = values[i];
      ${I}
      ${$}
      ${v.set("batch","row","col + i","output_channel","value")};
    }
  }`};return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${t.cacheKey};${a};${s};${g};${p[0]};${p[1]}`,inputDependencies:n?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:i?i(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:h}),getShaderSource:_}}}),Yu,Ur,Ju,Pr,Vn,tn,el,tl,Gn,K0=D(()=>{"use strict";re(),H0(),F0(),ya(),j0(),Pt(),ga(),$t(),Yu=(e,t,r,i,n,a)=>{let s=e[0],u=e.slice(a?1:2,a?3:4),l=u.length,p=t[0],c=t.slice(2).map((g,_)=>g+(g-1)*(r[_]-1)),h=u.map((g,_)=>g+i[_]+i[_+l]).map((g,_)=>Math.floor((g-c[_]+n[_])/n[_]));return h.splice(0,0,s),h.splice(a?3:1,0,p),h},Ur=[2,3,1,0],Ju=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length>5)throw new Error("greater than 5D is not supported");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],i=e[1].dims[1]*t.group;if(r!==i)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(e.length===3&&(e[2].dims.length!==1||e[1].dims[0]!==e[2].dims[0]))throw new Error("invalid bias");let n=e[0].dims.length-2;if(t.dilations.length!==n)throw new Error(`dilations should be ${n}D`);if(t.strides.length!==n)throw new Error(`strides should be ${n}D`);if(t.pads.length!==n*2)throw new Error(`pads should be ${n*2}D`);if(t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape")},Pr=(e,t)=>{let r=e.kernelShape.slice();r.length<t[1].dims.length-2&&r.push(...Array(t[1].dims.length-2-r.length).fill(0));for(let a=2;a<t[1].dims.length;++a)r[a-2]===0&&(r[a-2]=t[1].dims[a]);let i=e.pads.slice();Yr.adjustPadsBasedOnAutoPad(t[0].dims,e.strides,e.dilations,r,i,e.format==="NHWC",e.autoPad);let n=Object.assign({},e);return Object.assign(n,{kernelShape:r,pads:i}),n},Vn=e=>{let t=fa(e),r=e.format,i=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],n=e.dilations,a=e.group,s=e.kernel_shape,u=e.pads,l=e.strides,p=e.w_is_const();return{autoPad:i,format:r,dilations:n,group:a,kernelShape:s,pads:u,strides:l,wIsConst:p,...t,cacheKey:`${e.format};${t.activation};`}},tn=(e,t,r,i)=>{let n=r.format==="NHWC",a=Yu(t[0].dims,t[1].dims,r.dilations,r.pads,r.strides,n);if(r.group!==1){let C=[t[0]];if(n){let A=e.kernelCustomData.wT??e.compute(Ue(t[1],Ur),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=A),C.push(A)}else C.push(t[1]);t.length===3&&C.push(t[2]),!e.adapterInfo.isArchitecture("ampere")&&n&&t[1].dims[0]===r.group&&t[1].dims[1]===1&&r.dilations[0]===1&&r.dilations[1]===1?e.compute(bf(C,r,a,i),{inputs:C}):e.compute($f(C,r,a,i),{inputs:C});return}let s=t.length===3,u=t[0].dims[n?1:2],l=t[0].dims[n?2:3],p=t[0].dims[n?3:1],c=t[1].dims[2],h=t[1].dims[3],g=a[n?1:2],_=a[n?2:3],y=a[n?3:1],v=n&&c===u&&h===l&&r.pads[0]===0&&r.pads[1]===0;if(v||c===1&&h===1&&r.dilations[0]===1&&r.dilations[1]===1&&r.strides[0]===1&&r.strides[1]===1&&r.pads[0]===0&&r.pads[1]===0){let C=a[0],A,x,N,L=[];if(n){let J=e.kernelCustomData.wT??e.compute(Ue(t[1],Ur),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];if(r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=J),v){let O=u*l*p;A=t[0].reshape([1,C,O]),x=J.reshape([1,O,y]),N=[1,C,y]}else A=t[0].reshape([C,u*l,p]),x=J.reshape([1,p,y]),N=[C,g*_,y];L.push(A),L.push(x)}else A=t[0].reshape([C,p,u*l]),x=t[1].reshape([1,y,p]),N=[C,y,g*_],L.push(x),L.push(A);s&&L.push(t[2]);let X=N[2],Q=L[0].dims[L[0].dims.length-1];X<8&&Q<8?e.compute(ma(L,r,a,N,n,i),{inputs:L}):e.compute(ei(L,r,a,N,n,i),{inputs:L});return}let S=!0,$=e.kernelCustomData.wT??e.compute(Ue(t[1],Ur),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=$);let w=[t[0],$];s&&w.push(t[2]);let T=n?g*_:y,k=n?y:g*_,I=c*h*p;e.compute(yf(w,r,a,T,k,I,s,S,i),{inputs:w})},el=(e,t)=>{let r=t.format==="NHWC",i=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&i.push(e.inputs[2]);let n=[0,t.pads[0],0,t.pads[1]],a=[1].concat(t.strides),s=[1].concat(t.dilations),u=[1].concat(t.kernelShape),l=Pr({...t,pads:n,strides:a,dilations:s,kernelShape:u},i);tn(e,i,l,p=>r?[p[0],p[2],p[3]]:[p[0],p[1],p[3]])},tl=(e,t,r)=>{let i=r.format==="NHWC"?"channelsLast":"channelsFirst",n=Pr(r,t),a=r.autoPad==="NOTSET"?r.pads:r.autoPad,s=_f(t[0].dims,t[1].dims,r.strides,r.dilations,a,!1,i);e.compute(wf(t,n,s.outShape,[s.filterDepth,s.filterHeight,s.filterWidth],[s.padInfo.front,s.padInfo.top,s.padInfo.left],i))},Gn=(e,t)=>{if(Ju(e.inputs,t),e.inputs[0].dims.length===3)el(e,t);else if(e.inputs[0].dims.length===5)tl(e,e.inputs,t);else{let r=Pr(t,e.inputs);tn(e,e.inputs,r)}}}),vf,Z0=D(()=>{"use strict";ee(),dt(),re(),ie(),vf=(e,t,r)=>{let i=e.length>2,n=t.outputShape,a=t.format==="NHWC",s=t.group,u=e[1].dims,l=u[2]/s,p=u[3],c=a?ve(l):1,h=a&&p===1&&l>=4,g=h?Math.floor(l/4)*4:Math.floor(l/c)*c,_=l-g,y=a?ve(p):1,v=a?p===1?c:y:1,S=R.size(n)/y,$=[Math.ceil(S/64),1,1];de("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${$}`);let w=["rank","rank"],T=[t.strides[0],t.strides[1]],k=[t.kernelShape[a?1:2],t.kernelShape[a?2:3]],I=[t.dilations[0],t.dilations[1]],C=[k[0]+(t.dilations[0]<=1?0:(t.kernelShape[a?1:2]-1)*(t.dilations[0]-1)),k[1]+(t.dilations[1]<=1?0:(t.kernelShape[a?2:3]-1)*(t.dilations[1]-1))],A=[C[0]-1-Math.floor((t.pads[0]+t.pads[2])/2),C[1]-1-Math.floor((t.pads[1]+t.pads[3])/2)],x=[{type:12,data:S},{type:12,data:T},{type:12,data:k},{type:12,data:I},{type:12,data:C},{type:6,data:A},{type:12,data:g},{type:12,data:l},{type:12,data:p},...Z(e[0].dims,e[1].dims)];i&&(x.push(...Z(e[2].dims)),w.push("rank")),x.push(...Z(n));let N=L=>{let X=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:T.length},{name:"filter_dims",type:"u32",length:k.length},{name:"dilations",type:"u32",length:k.length},{name:"effective_filter_dims",type:"u32",length:C.length},{name:"pads",type:"i32",length:A.length},{name:"input_channels_per_group_int",type:"u32"},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],Q=Ce(e[0].dataType),J=a?1:2,O=a?2:3,W=a?3:1,Y=M("W",e[1].dataType,e[1].dims.length,v),P=M("Dy",e[0].dataType,e[0].dims.length,c),se=[P,Y];i&&se.push(M("bias",e[2].dataType,[n[W]].length,y));let ne=j("result",e[0].dataType,n.length,y),te=()=>{let F="";if(h)c===4?F+=`
        let xValue = ${P.getByOffset("x_offset")};
        let wValue = ${Y.getByOffset("w_offset")};
        dotProd = dotProd + dot(xValue, wValue);
        x_offset += 1u;
        w_offset += 1u;`:c===2?F+=`
          dotProd = dotProd + dot(vec4<${Q}>(${P.getByOffset("x_offset")}, ${P.getByOffset("x_offset + 1u")}), vec4<${Q}>(${Y.getByOffset("w_offset")}, ${Y.getByOffset("w_offset + 1u")}));
          x_offset += 2u;
          w_offset += 2u;`:c===1&&(F+=`
          dotProd = dotProd + dot(vec4<${Q}>(${P.getByOffset("x_offset")}, ${P.getByOffset("x_offset + 1u")}, ${P.getByOffset("x_offset + 2u")}, ${P.getByOffset("x_offset + 3u")}), vec4<${Q}>(${Y.getByOffset("w_offset")}, ${Y.getByOffset("w_offset + 1u")}, ${Y.getByOffset("w_offset + 2u")}, ${Y.getByOffset("w_offset + 3u")}));
          x_offset += 4u;
          w_offset += 4u;`);else if(F+=`
                  let xValue = ${a?P.getByOffset(`${P.indicesToOffset(`${P.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${c}`):P.get("batch","inputChannel","idyR","idyC")};
        `,c===1)F+=`
          let w_offset = ${Y.indicesToOffset(`${Y.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)};
          let wValue = ${Y.getByOffset(`w_offset / ${v}`)};
          dotProd = dotProd + xValue * wValue;`;else for(let V=0;V<c;V++)F+=`
            let wValue${V} = ${Y.getByOffset(`${Y.indicesToOffset(`${Y.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel + ${V}, wOutChannel)`)} / ${v}`)};
            dotProd = dotProd + xValue[${V}] * wValue${V};`;return F},U=()=>{if(_===0)return"";if(!h)throw new Error(`packInputAs4 ${h} is not true.`);let F="";if(c===1){F+="dotProd = dotProd";for(let V=0;V<_;V++)F+=`
            + ${P.getByOffset(`x_offset + ${V}`)} * ${Y.getByOffset(`w_offset + ${V}`)}`;F+=";"}else if(c===2){if(_!==2)throw new Error(`Invalid inputChannelsRemainder ${_}.`);F+=`
          let xValue = ${P.getByOffset("x_offset")};
          let wValue = ${Y.getByOffset("w_offset")};
          dotProd = dotProd + dot(xValue, wValue);`}return F},H=`
            let outputIndices = ${ne.offsetToIndices(`global_idx * ${y}`)};
            let batch = ${ne.indicesGet("outputIndices",0)};
            let d1 = ${ne.indicesGet("outputIndices",W)};
            let r = ${ne.indicesGet("outputIndices",J)};
            let c = ${ne.indicesGet("outputIndices",O)};
            let dyCorner = vec2<i32>(i32(r), i32(c)) - uniforms.pads;
            let dyRCorner = dyCorner.x;
            let dyCCorner = dyCorner.y;
            let groupId = d1 / uniforms.output_channels_per_group;
            let wOutChannel = d1 - groupId * uniforms.output_channels_per_group;
            // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
            // ? = to be determined. : = across all values in that axis.
            var dotProd = ${ne.type.value}(0.0);
            var wR: u32 = 0;
            if (uniforms.dilations.x == 1) {
              // Minimum wR >= 0 that satisfies (dyRCorner + wR) % (uniforms.strides.x) == 0
              wR = u32(((dyRCorner + i32(uniforms.strides.x) - 1) / i32(uniforms.strides.x)) * i32(uniforms.strides.x) - dyRCorner);
            }
            for (; wR < uniforms.effective_filter_dims.x; wR = wR + 1) {
              if (wR % uniforms.dilations.x != 0) {
                continue;
              }
              let dyR = (${Q}(dyRCorner) + ${Q}(wR)) / ${Q}(uniforms.strides[0]);
              let wRPerm = uniforms.filter_dims.x - 1 - wR / uniforms.dilations.x;
              if (dyR < 0.0 || dyR >= ${Q}(uniforms.Dy_shape[${J}]) || fract(dyR) > 0.0 ||
                  wRPerm < 0) {
                continue;
              }
              let idyR: u32 = u32(dyR);
              var wC: u32 = 0;
              if (uniforms.dilations.y == 1) {
                // Minimum wC >= 0 that satisfies (dyCCorner + wC) % (uniforms.strides.y) == 0
                wC = u32(((dyCCorner + i32(uniforms.strides.y) - 1) / i32(uniforms.strides.y)) * i32(uniforms.strides.y) - dyCCorner);
              }
              for (; wC < uniforms.effective_filter_dims.y; wC = wC + 1) {
                if (wC % uniforms.dilations.y != 0) {
                  continue;
                }
                let dyC = (${Q}(dyCCorner) + ${Q}(wC)) / ${Q}(uniforms.strides.y);
                let wCPerm = uniforms.filter_dims.y - 1 - wC / uniforms.dilations.y;
                if (dyC < 0.0 || dyC >= ${Q}(uniforms.Dy_shape[${O}]) ||
                    fract(dyC) > 0.0 || wCPerm < 0) {
                  continue;
                }
                let idyC: u32 = u32(dyC);
                var inputChannel = groupId * uniforms.input_channels_per_group;
                ${h?`
                var x_offset = ${P.indicesToOffset(`${P.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${c};
                var w_offset = ${Y.indicesToOffset(`${Y.type.indices}(wRPerm, wCPerm, inputChannel, wOutChannel)`)} / ${v};
                  `:""}
                for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group_int; d2 = d2 + ${h?4:c}) {
                  ${te()}
                  inputChannel = inputChannel + ${h?4:c};
                }
                ${U()}
                wC = wC + uniforms.strides.y - 1;
              }
              wR = wR + uniforms.strides[0] - 1;
            }
            let value = dotProd${i?` + bias[d1 / ${y}]`:""};
            ${ne.setByOffset("global_idx","value")};
          `;return`
    ${L.registerUniforms(X).declareVariables(...se,ne)}
      ${L.mainStart()}
      ${L.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
    ${H}}`};return{name:"ConvTranspose2D",shaderCache:{hint:`${t.cacheKey};${c}${v}${y}${h}${_}`,inputDependencies:w},getRunData:()=>({dispatchGroup:{x:$[0],y:$[1],z:$[2]},outputs:[{dims:r?r(n):n,dataType:e[0].dataType}],programUniforms:x}),getShaderSource:N}}}),rl,il,nl,rn,xf,al,nn,sl,Sf,Q0=D(()=>{"use strict";Z0(),Pt(),$t(),rl=(e,t,r,i,n,a)=>(e-1)*t+r+(i-1)*n+1-a,il=(e,t,r,i,n)=>{let a=Math.floor(e/2);t==="SAME_UPPER"?(r[i]=a,r[n]=e-a):t==="SAME_LOWER"&&(r[i]=e-a,r[n]=a)},nl=(e,t,r,i,n,a,s,u,l,p)=>{let c=e.length-2,h=p.length===0;l.length<c&&l.push(...Array(c-l.length).fill(0));let g=e[0],_=t[u?3:1]*n;for(let y=0,v=e.length-c-(u?1:0);y<c;++y,++v){let S=e[v],$=h?S*s[y]:p[y],w=rl(S,s[y],a[y],t[v],r[y],$);il(w,i,a,y,y+c),h&&p.push(s[y]*(S-1)+l[y]+(t[v]-1)*r[y]+1-a[y]-a[y+c])}p.splice(0,0,g),p.splice(u?3:1,0,_)},rn=(e,t)=>{let r=e.kernelShape.slice();if(e.kernelShape.length===0||e.kernelShape.reduce((h,g)=>h*g,1)===0){r.length=0;for(let h=2;h<t[1].dims.length;++h)r.push(t[1].dims[h])}let i=e.format==="NHWC";r.splice(0,0,t[1].dims[0]),r.splice(i?3:1,0,t[1].dims[1]);let n=e.pads.slice(),a=e.outputShape.slice(),s=e.outputPadding.slice(),u=t[0].dims,l=e.dilations.slice();if(l.reduce((h,g)=>h+g,0)===0){let h=t[0].dims.length-2;l=new Array(h).fill(1)}let p=e.strides.slice();if(p.reduce((h,g)=>h+g,0)===0){let h=t[0].dims.length-2;p=new Array(h).fill(1)}nl(u,r,l,e.autoPad,e.group,n,p,i,s,a);let c=Object.assign({},e);return Object.assign(c,{kernelShape:r,pads:n,outputPadding:s,outputShape:a,dilations:l,strides:p}),c},xf=e=>{let t=fa(e),r=e.format,i=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof e.autoPad>"u"?0:e.autoPad],n=e.dilations,a=e.group??1,s=e.kernelShape,u=e.pads,l=e.strides,p=e.wIsConst(),c=e.outputPadding,h=e.outputShape;return{autoPad:i,format:r,dilations:n,group:a,kernelShape:s,outputPadding:c,outputShape:h,pads:u,strides:l,wIsConst:p,...t,cacheKey:`${e.format};${t.activation};`}},al=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length!==4&&e[0].dims.length!==3)throw new Error("currently only support 2-dimensional conv");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],i=e[1].dims[0];if(r!==i)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let n=e[1].dims[1]*t.group;if(e.length===3&&(e[2].dims.length!==1||e[2].dims[0]!==n))throw new Error("invalid bias");let a=e[0].dims.length-2;if(t.dilations.reduce((s,u)=>s+u,0)>0&&t.dilations.length!==a)throw new Error(`dilations should be ${a}D`);if(t.strides.reduce((s,u)=>s+u,0)>0&&t.strides.length!==a)throw new Error(`strides should be ${a}D`);if(t.pads.reduce((s,u)=>s+u,0)>0&&t.pads.length!==a*2)throw new Error(`pads should be ${a*2}D`);if(t.outputPadding.length!==a&&t.outputPadding.length!==0)throw new Error(`output_padding should be ${a}D`);if(t.kernelShape.reduce((s,u)=>s+u,0)>0&&t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape");if(t.outputShape.length!==0&&t.outputShape.length!==e[0].dims.length-2)throw new Error("invalid output shape")},nn=(e,t,r,i)=>{let n=e.kernelCustomData.wT??e.compute(Ue(t[1],[2,3,0,1]),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=n);let a=[t[0],n];t.length===3&&a.push(t[2]),e.compute(vf(a,r,i),{inputs:a})},sl=(e,t)=>{let r=t.format==="NHWC",i=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&i.push(e.inputs[2]);let n=t.kernelShape;(n.length===0||n[0]===0)&&(n=[e.inputs[1].dims[2]]);let a=t.dilations;(a.length===0||a[0]===0)&&(a=[1]);let s=t.strides;(s.length===0||s[0]===0)&&(s=[1]);let u=t.pads;u.length===0&&(u=[0,0]),u=[0,u[0],0,u[1]],s=[1].concat(s),a=[1].concat(a),n=[1].concat(n);let l=t.outputPadding;l=[0].concat(l);let p=rn({...t,pads:u,strides:s,dilations:a,kernelShape:n,outputPadding:l},i);nn(e,i,p,c=>r?[c[0],c[2],c[3]]:[c[0],c[1],c[3]])},Sf=(e,t)=>{if(al(e.inputs,t),e.inputs[0].dims.length===3)sl(e,t);else{let r=rn(t,e.inputs);nn(e,e.inputs,r)}}}),ol,kf,Tf,X0=D(()=>{"use strict";ee(),re(),xe(),ie(),ol=(e,t,r,i)=>{let n=R.size(t),a=t.length,s=M("input",e,a),u=j("output",e,a),l=r.dataType===6?r.getInt32Array()[0]:Number(r.getBigInt64Array()[0]),p=R.normalizeAxis(l,a),c=h=>{let g=` i32(${s.indicesGet("inputIndices","uniforms.axis")}) `,_=K("uniforms.input_shape","uniforms.axis",a),y=i.reverse?g+(i.exclusive?" + 1":""):"0",v=i.reverse?_:g+(i.exclusive?"":" + 1");return`
                ${h.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(s,u)}
                ${h.mainStart()}
                  ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${u.offsetToIndices("global_idx")};
                  var sum = ${u.type.value}(0);
                  let first : i32 = ${y};
                  let last : i32 = ${v};
                  for (var i : i32 = first; i < last; i++) {
                    ${s.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${s.getByIndices("inputIndices")};
                  }
                  ${u.setByOffset("global_idx","sum")};
                }`};return{name:"CumSum",shaderCache:{hint:i.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:t,dataType:e}],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:[{type:12,data:n},{type:12,data:p},...Z(t,t)]}),getShaderSource:c}},kf=(e,t)=>{let r=e.inputs[0].dims,i=e.inputs[0].dataType,n=e.inputs[1];e.compute(ol(i,r,n,t),{inputs:[0]})},Tf=e=>{let t=e.exclusive===1,r=e.reverse===1;return he({exclusive:t,reverse:r})}}),ul,ll,dl,If,Ef,Y0=D(()=>{"use strict";ee(),re(),xe(),ie(),ul=e=>{if(!e||e.length!==1)throw new Error("DepthToSpace requires 1 input.");if(e[0].dims.length!==4)throw new Error("DepthToSpace requires 4D input.")},ll=(e,t,r,i)=>{let n=[];n.push(`fn perm(i: ${i.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`);for(let a=0;a<t;++a)n.push(r.indicesSet("a",e[a],`i[${a}]`));return n.push("return a;}"),n.join(`
`)},dl=(e,t)=>{let r,i,n,a,s,u,l=t.format==="NHWC",p=t.blocksize,c=t.mode==="DCR";l?([r,i,n,a]=e.dims,s=c?[r,i,n,p,p,a/p**2]:[r,i,n,a/p**2,p,p],u=c?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([r,i,n,a]=[e.dims[0],e.dims[2],e.dims[3],e.dims[1]],s=c?[r,p,p,a/p**2,i,n]:[r,a/p**2,p,p,i,n],u=c?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let h=e.reshape(s),g=h.dims.length,_=e.dataType,y=M("a",_,g),v=j("output",_,g),S=$=>`
  ${$.registerUniform("output_size","u32").declareVariables(y,v)}

  ${ll(u,g,y,v)}

  ${$.mainStart()}
    ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${v.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${v.setByOffset("global_idx",y.getByIndices("aIndices"))}
  }`;return{name:"DepthToSpace",shaderCache:{hint:`${e.dims};${t.blocksize};${t.mode}`,inputDependencies:["rank"]},getRunData:$=>{let w=l?[r,i*p,n*p,a/p**2]:[r,a/p**2,i*p,n*p],T=R.size(w),k=h.dims,I=R.sortBasedOnPerm(k,u);return{outputs:[{dims:w,dataType:$[0].dataType}],dispatchGroup:{x:Math.ceil(T/64)},programUniforms:[{type:12,data:T},...Z(k,I)]}},getShaderSource:S}},If=(e,t)=>{ul(e.inputs),e.compute(dl(e.inputs[0],t))},Ef=e=>he({blocksize:e.blocksize,mode:e.mode,format:e.format})}),ot,ar,Lr,an,gt,pl,cl,fl,sn,on,un,hl,ml,ln,gl,Cf,zf,J0=D(()=>{"use strict";ee(),re(),xe(),ie(),ot=256,ar=512,Lr=2*Math.PI,an=e=>{let t=[],r=e;for(let i of[4,2,3,5])for(;r%i===0;)t.push(i),r/=i;return r===1?t:void 0},gt=e=>{let t=e.toPrecision(9);return/[.eE]/.test(t)?t:`${t}.0`},pl=(e,t,r,i,n)=>{let a=r/e,s=ar-i,u=p=>`smem[${s}u + base + ${p*t}u]`,l=`  for (var t = local_idx; t < ${a}u; t += ${ot}u) {
`;l+=`    let twiddleIndex = t % ${t}u;
    let angleUnit = f32(twiddleIndex);
`,l+=`    var leg: array<vec2<f32>, 5>;
`;for(let p=0;p<e;p++){let c=`${i}u + t + ${p*a}u`;if(p===0)l+=`    leg[0] = smem[${c}];
`;else{let h=n*Lr*p/(e*t);l+=`    { let a = ${gt(h)} * angleUnit; leg[${p}] = cmul(smem[${c}], vec2<f32>(cos(a), sin(a))); }
`}}if(l+=`    let base = (t / ${t}u) * ${t*e}u + twiddleIndex;
`,e===2)l+=`    ${u(0)} = leg[0] + leg[1];
    ${u(1)} = leg[0] - leg[1];
`;else if(e===4){let p=n<0?"vec2<f32>(oddDiff.y, -oddDiff.x)":"vec2<f32>(-oddDiff.y, oddDiff.x)";l+=`    let evenSum = leg[0] + leg[2]; let evenDiff = leg[0] - leg[2];
`,l+=`    let oddSum = leg[1] + leg[3]; let oddDiff = leg[1] - leg[3];
`,l+=`    let oddRot = ${p};
`,l+=`    ${u(0)} = evenSum + oddSum;
    ${u(1)} = evenDiff + oddRot;
`,l+=`    ${u(2)} = evenSum - oddSum;
    ${u(3)} = evenDiff - oddRot;
`}else for(let p=0;p<e;p++){let c=["leg[0]"];for(let h=1;h<e;h++){let g=n*Lr*(h*p)/e,_=gt(Math.cos(g)),y=gt(Math.sin(g));c.push(`vec2<f32>(leg[${h}].x*${_} - leg[${h}].y*${y}, leg[${h}].x*${y} + leg[${h}].y*${_})`)}l+=`    ${u(p)} = ${c.join(" + ")};
`}return`${l}  }
  workgroupBarrier();
`},cl=(e,t,r)=>{let i="",n=1,a=0;for(let s of e)i+=pl(s,n,t,a,r),n*=s,a=ar-a;return{code:i,resultOffset:a}},fl=(e,t,r,i,n)=>{let a=e.dims,s=a.length,u=a[s-1],l=a[t],p=r&&i?(l-1)*2:l;n!==void 0&&(p=n);let c=r&&i?1:2,h=i&&!r?Math.floor(p/2)+1:p,g=a.slice();g[t]=h,g[s-1]=c;let _=1;for(let v=t+1;v<s-1;v++)_*=a[v];let y=R.size(a)/u/l;return{dataType:e.dataType,outputDims:g,length:p,signalLength:l,inner:_,batch:y,inputComponents:u,outputComponents:c,outputLength:h,inverse:r,onesided:i}},sn=(e,t)=>[t,e.length,e.inputComponents,e.outputComponents,e.inverse,e.onesided].join(";"),on=e=>[{type:12,data:e.batch},{type:12,data:e.signalLength},{type:12,data:e.inner},{type:12,data:e.outputLength}],un=(e,t,r)=>e.registerUniform("batch","u32").registerUniform("signalLength","u32").registerUniform("inner","u32").registerUniform("outputLength","u32").declareVariables(t,r),hl=e=>{let{dataType:t,length:r,inputComponents:i,outputComponents:n,inverse:a,onesided:s}=e,u=Ee(t),l=a?1:-1,p=a?1/r:1,c=an(r),h=g=>{let _=M("x",t,[1]),y=j("y",t,[1]),v=I=>{let C=`inBase + (${I}) * uniforms.inner * ${i}u`,A=`f32(${_.getByOffset(C)})`,x=i===2?`f32(${_.getByOffset(`${C} + 1u`)})`:"0.0";return`vec2<f32>(${A}, ${x})`},S;if(a&&s){let I=Math.floor(r/2)+1,C=r%2===0?`select(provided, provided - 1u, provided == ${I}u)`:"provided";S=`
    let provided = min(uniforms.signalLength, ${I}u);
    for (var i = local_idx; i < ${r}u; i += ${ot}u) {
      if (i < provided) { smem[i] = ${v("i")}; } else { smem[i] = vec2<f32>(0.0); }
    }
    workgroupBarrier();
    for (var k = local_idx + 1u; k < ${C}; k += ${ot}u) {
      let h = smem[k];
      smem[${r}u - k] = vec2<f32>(h.x, -h.y);
    }
    workgroupBarrier();`}else S=`
    let loadCount = min(uniforms.signalLength, ${r}u);
    for (var i = local_idx; i < ${r}u; i += ${ot}u) {
      if (i < loadCount) { smem[i] = ${v("i")}; } else { smem[i] = vec2<f32>(0.0); }
    }
    workgroupBarrier();`;let{code:$,resultOffset:w}=cl(c,r,l),T=p===1?`smem[${w}u + i]`:`smem[${w}u + i] * ${gt(p)}`,k=n===2?y.setByOffset("off + 1u",`${u}(v.y)`):"";return`
  ${un(g,_,y)}
  var<workgroup> smem: array<vec2<f32>, ${2*ar}>;
  fn cmul(a: vec2<f32>, b: vec2<f32>) -> vec2<f32> {
    return vec2<f32>(a.x * b.x - a.y * b.y, a.x * b.y + a.y * b.x);
  }
  ${g.mainStart(ot)}
    let row = workgroup_index;
    if (row >= uniforms.batch) { return; }
    let outer = row / uniforms.inner;
    let within = row % uniforms.inner;
    let inBase = (outer * uniforms.signalLength * uniforms.inner + within) * ${i}u;
    let outBase = (outer * uniforms.outputLength * uniforms.inner + within) * ${n}u;
    ${S}
${$}    for (var i = local_idx; i < uniforms.outputLength; i += ${ot}u) {
      let v = ${T};
      let off = outBase + i * uniforms.inner * ${n}u;
      ${y.setByOffset("off",`${u}(v.x)`)}
      ${k}
    }
  }`};return{name:"DFT",shaderCache:{hint:sn(e,"fft"),inputDependencies:["type"]},getShaderSource:h,getRunData:()=>({outputs:[{dims:e.outputDims,dataType:t}],programUniforms:on(e),dispatchGroup:{x:e.batch}})}},ml=e=>{let{dataType:t,length:r,inputComponents:i,outputComponents:n,inverse:a,onesided:s}=e,u=Ee(t),l=a?1:-1,p=a?1/r:1,c=h=>{let g=M("x",t,[1]),_=j("y",t,[1]),y=T=>{let k=`inBase + (${T}) * uniforms.inner * ${i}u`,I=`f32(${g.getByOffset(k)})`,C=i===2?`f32(${g.getByOffset(`${k} + 1u`)})`:"0.0";return`vec2<f32>(${I}, ${C})`},v=a&&s?`fn spectrum(inBase: u32, k: u32) -> vec2<f32> {
    let provided = min(uniforms.signalLength, ${Math.floor(r/2)+1}u);
    if (k < provided) { return ${y("k")}; }
    let m = ${r}u - k;
    if (m < provided) {
      let h = ${y("m")};
      return vec2<f32>(h.x, -h.y);
    }
    return vec2<f32>(0.0, 0.0);
  }`:`fn spectrum(inBase: u32, n: u32) -> vec2<f32> {
    if (n < uniforms.signalLength) { return ${y("n")}; }
    return vec2<f32>(0.0, 0.0);
  }`,S=`
      let angle = ${gt(l*Lr)} * f32(knMod) / ${gt(r)};
      acc += cmul(spectrum(inBase, n), vec2<f32>(cos(angle), sin(angle)));
      knMod += k;
      if (knMod >= ${r}u) { knMod -= ${r}u; }`,$=n===2?_.setByOffset("off + 1u",`${u}(v.y)`):"",w=p===1?"acc":`acc * ${gt(p)}`;return`
  ${un(h,g,_)}
  fn cmul(a: vec2<f32>, b: vec2<f32>) -> vec2<f32> {
    return vec2<f32>(a.x * b.x - a.y * b.y, a.x * b.y + a.y * b.x);
  }
  ${v}
  ${h.mainStart(ot)}
    let row = workgroup_index;
    if (row >= uniforms.batch) { return; }
    let outer = row / uniforms.inner;
    let within = row % uniforms.inner;
    let inBase = (outer * uniforms.signalLength * uniforms.inner + within) * ${i}u;
    let outBase = (outer * uniforms.outputLength * uniforms.inner + within) * ${n}u;
    for (var k = local_idx; k < uniforms.outputLength; k += ${ot}u) {
      var acc = vec2<f32>(0.0, 0.0);
      var knMod = 0u;
      for (var n = 0u; n < ${r}u; n++) {${S}
      }
      let v = ${w};
      let off = outBase + k * uniforms.inner * ${n}u;
      ${_.setByOffset("off",`${u}(v.x)`)}
      ${$}
    }
  }`};return{name:"DFT",shaderCache:{hint:sn(e,"direct"),inputDependencies:["type"]},getShaderSource:c,getRunData:()=>({outputs:[{dims:e.outputDims,dataType:t}],programUniforms:on(e),dispatchGroup:{x:e.batch}})}},ln=e=>{if(!e||e.dataType===0)return;if(R.size(e.dims)!==1)throw new Error("DFT optional scalar inputs must have exactly 1 element.");if(e.dataType===6)return e.getInt32Array()[0];let t=Number(e.getBigInt64Array()[0]);if(!Number.isSafeInteger(t))throw new Error("DFT optional scalar inputs are out of JavaScript safe integer range.");return t},gl=e=>{if(!e||e.length<1)throw new Error("DFT requires at least 1 input.");let t=e[0].dims;if(t.length<2)throw new Error("DFT input must have at least 2 dimensions.");let r=t[t.length-1];if(r!==1&&r!==2)throw new Error("DFT input's innermost dimension must be 1 (real) or 2 (complex).")},Cf=(e,t)=>{gl(e.inputs);let r=e.inputs[0],i=r.dims.length,n=t.inverse!==0,a=t.onesided!==0,s=ln(e.inputs[1]);if(s!==void 0&&s<=0)throw new Error("dft_length must be greater than zero.");let u=R.normalizeAxis(ln(e.inputs[2])??t.axis,i);if(u===i-1)throw new Error("DFT axis must refer to a signal dimension, not the innermost (real/imaginary) dimension.");if(n&&a&&r.dims[i-1]!==2)throw new Error("Inverse one-sided DFT (IRFFT) requires complex-valued input (innermost dimension 2).");let l=fl(r,u,n,a,s);if(l.length<=0)throw new Error(`Invalid DFT length: ${l.length}`);let p=l.length<=ar&&an(l.length)!==void 0?hl(l):ml(l);e.compute(p,{inputs:[0]})},zf=e=>he({axis:e.axis??1,inverse:e.inverse??0,onesided:e.onesided??0})}),qr,sr,dn,yl,_l,wl,$l,pn,bl,Af,Of,ey=D(()=>{"use strict";ee(),re(),xe(),ie(),qr="[a-zA-Z]|\\.\\.\\.",sr="("+qr+")+",dn="^"+sr+"$",yl="("+sr+",)*"+sr,_l="^"+yl+"$",wl=class{constructor(e=-1){this.symbolToIndices=new Map,this.inputIndex=e}addSymbol(e,t){let r=this.symbolToIndices.get(e);r===void 0?r=[t]:r.push(t),this.symbolToIndices.set(e,r)}},$l=class{constructor(e,t){this.equation=t,this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=new Array,this.outputDims=[];let[r,i]=t.includes("->")?t.split("->",2):[t,""];if(!r.match(RegExp(_l)))throw new Error("Invalid LHS term");if(r.split(",").forEach((n,a)=>{let s=e[a].dims.slice();if(!n.match(RegExp(dn)))throw new Error("Invalid LHS term");let u=this.processTerm(n,!0,s,a);this.lhs.push(u)}),i==="")i+=[...this.symbolToInfo.entries()].filter(([n,a])=>a.count===1||n==="...").map(([n])=>n).join("");else if(!i.match(RegExp(sr)))throw new Error("Invalid RHS");i.match(RegExp(qr,"g"))?.forEach(n=>{if(n==="...")this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let a=this.symbolToInfo.get(n);if(a===void 0)throw new Error("Invalid RHS symbol");this.outputDims.push(a.dimValue)}}),this.rhs=this.processTerm(i,!1,this.outputDims)}addSymbol(e,t,r){let i=this.symbolToInfo.get(e);if(i!==void 0){if(i.dimValue!==t&&i.count!==1)throw new Error("Dimension mismatch");i.count++,i.inputIndices.push(r)}else i={count:1,dimValue:t,inputIndices:[r]};this.symbolToInfo.set(e,i)}processTerm(e,t,r,i=-1){let n=r.length,a=!1,s=[],u=0;if(!e.match(RegExp(dn))&&!t&&e!=="")throw new Error("Invalid LHS term");let l=e.match(RegExp(qr,"g")),p=new wl(i);return l?.forEach((c,h)=>{if(c==="..."){if(a)throw new Error("Only one ellipsis is allowed per input term");a=!0;let g=n-l.length+1;if(g<0)throw new Error("Ellipsis out of bounds");if(s=r.slice(u,u+g),this.hasEllipsis){if(this.ellipsisDims.length!==s.length||this.ellipsisDims.toString()!==s.toString())throw new Error("Ellipsis dimensions mismatch")}else if(t)this.hasEllipsis=!0,this.ellipsisDims=s;else throw new Error("Ellipsis must be specified in the LHS");for(let _=0;_<s.length;_++){let y=String.fromCharCode(48+_);p.addSymbol(y,h+_),this.addSymbol(y,r[u++],i)}}else p.addSymbol(c,h+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(c,r[u++],i)}),p}},pn=e=>e+"_max",bl=(e,t,r,i)=>{let n=e.map(p=>p.length).map((p,c)=>M(`input${c}`,t,p)),a=R.size(i),s=j("output",t,i.length),u=[...r.symbolToInfo.keys()].filter(p=>!r.rhs.symbolToIndices.has(p)),l=p=>{let c=[],h="var prod = 1.0;",g="var sum = 0.0;",_="sum += prod;",y=[],v=[],S=[],$=[],w=r.symbolToInfo.size===r.rhs.symbolToIndices.size;r.symbolToInfo.forEach((k,I)=>{if(r.rhs.symbolToIndices.has(I)){let C=r.rhs.symbolToIndices.get(I)?.[0];C!==void 0&&r.lhs.forEach((A,x)=>{if(k.inputIndices.includes(x)){let N=A.symbolToIndices.get(I);if(N===void 0)throw new Error("Invalid symbol error");N.forEach(L=>{c.push(`${n[x].indicesSet(`input${x}Indices`,L,s.indicesGet("outputIndices",C))}`)})}})}else r.lhs.forEach((C,A)=>{if(k.inputIndices.includes(A)){let x=C.symbolToIndices.get(I);if(x===void 0)throw new Error("Invalid symbol error");x.forEach(N=>{y.push(`${n[A].indicesSet(`input${A}Indices`,N,`${I}`)}`)}),$.push(`prod *= ${n[A].getByIndices(`input${A}Indices`)};`)}}),v.push(`for(var ${I}: u32 = 0; ${I} < uniforms.${pn(I)}; ${I}++) {`),S.push("}")});let T=w?[...c,`let sum = ${n.map((k,I)=>k.getByIndices(`input${I}Indices`)).join(" * ")};`]:[...c,g,...v,...y,h,...$,_,...S];return`
            ${p.registerUniforms(u.map(k=>({name:`${pn(k)}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...n,s)}

            ${p.mainStart()}
            ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${s.offsetToIndices("global_idx")};
            ${n.map((k,I)=>`var input${I}Indices: ${n[I].type.indices};`).join(`
`)}
            ${T.join(`
`)};
            ${s.setByOffset("global_idx","sum")};
          }`};return{name:"Einsum",shaderCache:{hint:r.equation,inputDependencies:e.map(()=>"rank")},getRunData:()=>{let p=u.filter(h=>r.symbolToInfo.has(h)).map(h=>({type:12,data:r.symbolToInfo.get(h)?.dimValue||0}));p.push({type:12,data:a});let c=e.map((h,g)=>[...Z(h)]).reduce((h,g)=>h.concat(g),p);return c.push(...Z(i)),{outputs:[{dims:i,dataType:t}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:c}},getShaderSource:l}},Af=(e,t)=>{let r=new $l(e.inputs,t.equation),i=r.outputDims,n=e.inputs.map((a,s)=>a.dims);e.compute(bl(n,e.inputs[0].dataType,r,i))},Of=e=>{let t=e.equation.replace(/\s+/g,"");return he({equation:t})}}),vl,cn,xl,Sl,Rf,ty=D(()=>{"use strict";ee(),re(),ie(),vl=e=>{if(!e||e.length!==2)throw new Error("Expand requires 2 input.");let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),i=r.length<t.length?0:r.length-t.length,n=t.length<r.length?0:t.length-r.length;for(;i<r.length&&n<t.length;++i,++n)if(r[i]!==t[n]&&r[i]!==1&&t[n]!==1)throw new Error("Expand requires shape to be broadcastable to input")},cn=(e,t)=>{let r=e.length-t.length,i=[];for(let n=0;n<r;++n)i.push(e[n]);for(let n=0;n<t.length;++n)i.push(t[n]===1?e[n+r]:t[n]);return i},xl=(e,t)=>e.length>t.length?cn(e,t):cn(t,e),Sl=e=>{let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),i=xl(t,r),n=e[0].dataType,a=n===9||R.size(t)===1,s=n===9||t.length>0&&t[t.length-1]%4===0?4:1,u=a||i.length>0&&i[i.length-1]%4===0?4:1,l=Math.ceil(R.size(i)/u),p=h=>{let g=M("input",n,t.length,s),_=j("output",n,i.length,u),y;if(n===9){let v=(S,$,w="")=>`
          let outputIndices${$} = ${_.offsetToIndices(`outputOffset + ${$}u`)};
          let offset${$} = ${g.broadcastedIndicesToOffset(`outputIndices${$}`,_)};
          let index${$} = offset${$} / 4u;
          let component${$} = offset${$} % 4u;
          ${S}[${$}] = ${w}(${g.getByOffset(`index${$}`)}[component${$}]);
        `;y=`
        let outputOffset = global_idx * ${u};
        var data = vec4<u32>(0);
        ${v("data",0,"u32")}
        ${v("data",1,"u32")}
        ${v("data",2,"u32")}
        ${v("data",3,"u32")}
        ${_.setByOffset("global_idx","data")}
      }`}else y=`
        let outputIndices = ${_.offsetToIndices(`global_idx * ${u}`)};
        let inputOffset = ${g.broadcastedIndicesToOffset("outputIndices",_)};
        let data = ${_.type.value}(${g.getByOffset(`inputOffset / ${s}`)});
        ${_.setByOffset("global_idx","data")}
      }`;return`
    ${h.registerUniform("vec_size","u32").declareVariables(g,_)}
    ${h.mainStart()}
    ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${y}`},c=[{type:12,data:l},...Z(t,i)];return{name:"Expand",shaderCache:{hint:`${i.length};${s}${u}`,inputDependencies:["rank"]},getShaderSource:p,getRunData:()=>({outputs:[{dims:i,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:c})}},Rf=e=>{vl(e.inputs),e.compute(Sl(e.inputs),{inputs:[0]})}}),kl,Bf,ry=D(()=>{"use strict";ee(),re(),ie(),ca(),kl=e=>{let t=e[0].dataType,r=R.size(e[0].dims),i=R.size(e[1].dims),n=i%4===0,a=s=>{let u=M("x",t,[1],4),l=M("bias",t,[1],4),p=j("y",t,[1],4),c=[{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}],h=_=>`
      let bias${_}_offset: u32 = (global_idx * 4 + ${_}) % uniforms.bias_size;
      let bias${_} = ${l.getByOffset(`bias${_}_offset / 4`)}[bias${_}_offset % 4];`,g=n?`
      let bias = ${l.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${h(0)}${h(1)}${h(2)}${h(3)}
      let bias = ${u.type.value}(bias0, bias1, bias2, bias3);`;return`${s.registerUniforms(c).declareVariables(u,l,p)}

    ${Pn(Ee(t))}

    ${s.mainStart(Kt)}
      ${s.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${u.getByOffset("global_idx")};
      ${g}
      let x_in = x + bias;
      ${p.setByOffset("global_idx",Ln("x_in"))}
    }`};return{name:"FastGeluWithBias",shaderCache:{hint:`${n}`,inputDependencies:["type","type"]},getShaderSource:a,getRunData:s=>({outputs:[{dims:s[0].dims,dataType:s[0].dataType}],programUniforms:[{type:12,data:Math.ceil(r/4)},{type:12,data:i}],dispatchGroup:{x:Math.ceil(r/Kt/4)}})}},Bf=e=>{e.inputs.length<2||R.size(e.inputs[1].dims)===0?Xc(e):e.compute(kl(e.inputs))}}),Tl,Il,Mf,Nf,iy=D(()=>{"use strict";ee(),re(),xe(),ie(),Tl=e=>{if(!e||e.length!==2)throw new Error("Gather requires 2 inputs.")},Il=(e,t)=>{let r=e[0].dims,i=e[1].dims,n=r.length,a=R.normalizeAxis(t.axis,n),s=r.slice(0);s.splice(a,1,...i);let u=r[a],l=e[0].dataType===9?4:1,p=Math.ceil(R.size(s)/l),c=[{type:12,data:p},{type:6,data:u},{type:12,data:a},...Z(e[0].dims,e[1].dims,s)],h=g=>{let _=M("data",e[0].dataType,e[0].dims.length,l),y=M("inputIndices",e[1].dataType,e[1].dims.length),v=j("output",e[0].dataType,s.length,l),S=w=>{let T=i.length,k=`var indicesIndices${w}  = ${y.type.indices}(0);`;for(let I=0;I<T;I++)k+=`${T>1?`indicesIndices${w}[${I}]`:`indicesIndices${w}`} = ${s.length>1?`outputIndices${w}[uniforms.axis + ${I}]`:`outputIndices${w}`};`;k+=`
          var idx${w} = ${y.getByIndices(`indicesIndices${w}`)};
          if (idx${w} < 0) {
            idx${w} = idx${w} + uniforms.axisDimLimit;
          }
          var dataIndices${w} : ${_.type.indices};
        `;for(let I=0,C=0;I<n;I++)I===a?(k+=`${n>1?`dataIndices${w}[${I}]`:`dataIndices${w}`} = u32(idx${w});`,C+=T):(k+=`${n>1?`dataIndices${w}[${I}]`:`dataIndices${w}`} = ${s.length>1?`outputIndices${w}[${C}]`:`outputIndices${w}`};`,C++);return k},$;if(e[0].dataType===9){let w=(T,k,I="")=>`
          let outputIndices${k} = ${v.offsetToIndices(`outputOffset + ${k}u`)};
          ${S(k)};
          let offset${k} = ${_.indicesToOffset(`dataIndices${k}`)};
          let index${k} = offset${k} / 4u;
          let component${k} = offset${k} % 4u;
          ${T}[${k}] = ${I}(${_.getByOffset(`index${k}`)}[component${k}]);
        `;$=`
        let outputOffset = global_idx * ${l};
        var value = vec4<u32>(0);
        ${w("value",0,"u32")}
        ${w("value",1,"u32")}
        ${w("value",2,"u32")}
        ${w("value",3,"u32")}
        ${v.setByOffset("global_idx","value")}
      `}else $=`
      let outputIndices = ${v.offsetToIndices("global_idx")};
      ${S("")};
      let value = ${_.getByIndices("dataIndices")};
      ${v.setByOffset("global_idx","value")};
      `;return`
      ${g.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(_,y,v)}
      ${g.mainStart()}
        ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${$}
      }`};return{name:"Gather",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:s,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:c}),getShaderSource:h}},Mf=e=>he({axis:e.axis}),Nf=(e,t)=>{let r=e.inputs;Tl(r),e.compute(Il(e.inputs,t))}}),El,Df,Uf,ny=D(()=>{"use strict";ee(),re(),ie(),El=(e,t,r,i,n,a,s,u,l)=>{let p=[{type:12,data:a},{type:12,data:i},{type:12,data:n},{type:12,data:r},{type:12,data:s},{type:12,data:u},{type:12,data:l}],c=[a];p.push(...Z(t.dims,c));let h=g=>{let _=M("indices_data",t.dataType,t.dims.length),y=j("input_slice_offsets_data",12,1,1),v=[_,y],S=[{name:"output_size",type:"u32"},{name:"batch_dims",type:"u32"},{name:"input_dims",type:"u32",length:n.length},{name:"sizes_from_slice_dims_data",type:"u32",length:r.length},{name:"num_slices_per_batch",type:"u32"},{name:"input_batch_stride",type:"u32"},{name:"num_slice_dims",type:"u32"}];return`
  ${g.registerUniforms(S).declareVariables(...v)}
  ${g.mainStart()}
    ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let batch_idx = global_idx / uniforms.num_slices_per_batch;
    let base_offset = batch_idx * uniforms.input_batch_stride;

    let slice_indices_base_offset = global_idx * uniforms.num_slice_dims;
    var relative_slice_offset = 0;
    for (var dim_idx = 0u; dim_idx < uniforms.num_slice_dims; dim_idx ++) {
      var index = i32(indices_data[dim_idx + slice_indices_base_offset].x);
      let input_dim_idx = uniforms.batch_dims + dim_idx;
      if (index < 0) {
        ${n.length===1?"index += i32(uniforms.input_dims);":"index += i32(uniforms.input_dims[input_dim_idx]);"}
      }
      ${r.length===1?"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data);":"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data[dim_idx]);"}
    }

    input_slice_offsets_data[global_idx] =  base_offset + u32(relative_slice_offset);
  }`};return e.compute({name:"computeSliceOffsets",shaderCache:{hint:`${n.length}_${r.length}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:c,dataType:e.inputs[1].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:p}),getShaderSource:h},{inputs:[t],outputs:[-1]})[0]},Df=(e,t)=>{let r=e.inputs,i=r[0].dims,n=r[0].dataType,a=r[1].dims,s=a[a.length-1],u=R.sizeToDimension(a,a.length-1),l=R.sizeFromDimension(i,t.batchDims+s),p=R.sizeToDimension(i,t.batchDims),c=R.sizeFromDimension(i,t.batchDims),h=u/p,g=new Array(s),_=l;for(let k=0;k<s;++k)g[s-1-k]=_,_*=i[t.batchDims+s-1-k];let y=El(e,r[1],g,t.batchDims,i,u,h,c,s),v=t.batchDims+s;if(v>i.length)throw new Error("last dimension of indices must not be larger than rank of input tensor");let S=a.slice(0,-1).concat(i.slice(v)),$=R.size(S),w=[{type:12,data:$},{type:12,data:l},...Z(r[0].dims,y.dims,S)],T=k=>{let I=M("data",r[0].dataType,r[0].dims.length),C=M("slice_offsets",12,y.dims.length),A=j("output",r[0].dataType,S.length);return`
          ${k.registerUniform("output_size","u32").registerUniform("slice_size","u32").declareVariables(I,C,A)}
            ${k.mainStart()}
            ${k.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let slice_offset = slice_offsets[global_idx / uniforms.slice_size];
          output[global_idx] = data[u32(slice_offset) + global_idx % uniforms.slice_size];
        }`};e.compute({name:"GatherND",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:S,dataType:n}],dispatchGroup:{x:Math.ceil($/64)},programUniforms:w}),getShaderSource:T},{inputs:[r[0],y]})},Uf=e=>({batchDims:e.batch_dims,cacheKey:""})}),Cl,zl,Pf,Lf,ay=D(()=>{"use strict";ee(),re(),xe(),ie(),Cl=(e,t)=>{if(e.length<3||e.length>4)throw new Error("GatherBlockQuantized requires 3 or 4 inputs.");let r=R.normalizeAxis(t.quantizeAxis,e[0].dims.length),i=t.blockSize,n=e[0],a=e[2],s=e.length===4?e[3]:void 0;if(a.dims.length!==n.dims.length||!n.dims.map((u,l)=>l===r?Math.ceil(u/i)===a.dims[l]:u===a.dims[l]).reduce((u,l)=>u&&l,!0))throw new Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(s){if(s.dataType!==n.dataType)throw new Error("Zero point must have the same data type as the input tensor.");if(s.dims.length!==a.dims.length||!s.dims.map((u,l)=>u===a.dims[l]).reduce((u,l)=>u&&l,!0))throw new Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}},zl=(e,t)=>{let r=e[0].dims,i=e[1].dims,n=r.length,a=R.normalizeAxis(t.gatherAxis,n),s=R.normalizeAxis(t.quantizeAxis,n),u=r.slice(0);u.splice(a,1,...i);let l=R.size(u),p=e[2].dataType,c=e[0].dataType===22,h=[{type:12,data:l},{type:12,data:s},{type:12,data:a},{type:12,data:t.blockSize},...Z(...e.map((_,y)=>_.dims),u)],g=_=>{let y=M("data",e[0].dataType,e[0].dims.length),v=M("inputIndices",e[1].dataType,e[1].dims.length),S=M("scales",e[2].dataType,e[2].dims.length),$=e.length>3?M("zeroPoint",e[3].dataType,e[3].dims.length):void 0,w=j("output",p,u.length),T=[y,v,S];$&&T.push($);let k=[{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}];return`
        ${_.registerUniforms(k).declareVariables(...T,w)}
        ${_.mainStart()}
        let output_indices = ${w.offsetToIndices("global_idx")};
        var indices_indices = ${v.type.indices}(0);
        ${i.length>1?`
          for (var i: u32 = 0; i < ${i.length}; i++) {
            let index = ${w.indicesGet("output_indices","uniforms.gather_axis + i")};
            ${v.indicesSet("indices_indices","i","index")};
          }`:`indices_indices = ${w.indicesGet("output_indices","uniforms.gather_axis")};`};
        var data_indices = ${y.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${w.indicesGet("output_indices","i")};
          ${y.indicesSet("data_indices","i","index")};
        }
        var index_from_indices = ${v.getByIndices("indices_indices")};
        if (index_from_indices < 0) {
          index_from_indices += ${r[a]};
        }
        ${y.indicesSet("data_indices","uniforms.gather_axis","u32(index_from_indices)")};
        for (var i = uniforms.gather_axis + 1; i < ${u.length}; i++) {
          let index = ${w.indicesGet("output_indices",`i + ${i.length} - 1`)};
          ${y.indicesSet("data_indices","i","index")};
        }
        let data_offset = ${y.indicesToOffset("data_indices")};
        let data_index = data_offset % 8;
        // Convert 4-bit packed data to 8-bit packed data.
        let packed_4bit_quantized_data = ${y.getByOffset("data_offset / 8")};
        let packed_8bit_quantized_data = (packed_4bit_quantized_data >> (4 * (data_index % 2))) & 0x0f0f0f0f;
        let quantized_data_vec = ${c?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_quantized_data));
        let quantized_data = quantized_data_vec[data_index / 2];
        var scale_indices = data_indices;
        let quantize_axis_index = ${S.indicesGet("data_indices","uniforms.quantize_axis")} / uniforms.block_size;
        ${S.indicesSet("scale_indices","uniforms.quantize_axis","quantize_axis_index")};
        var scale = ${S.getByIndices("scale_indices")};
        ${$?`
              let zero_point_indices = scale_indices;
              let zero_point_offset = ${$.indicesToOffset("zero_point_indices")};
              let zero_point_index = zero_point_offset % 8;
              let packed_4bit_zero_points = ${$.getByOffset("zero_point_offset / 8")};
              let packed_8bit_zero_points = (packed_4bit_zero_points >> (4 * (zero_point_index % 2))) & 0x0f0f0f0f;
              let zero_point_vec = ${c?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_zero_points));
              let zero_point = zero_point_vec[zero_point_index / 2];`:"var zero_point = 0"};
        let dequantized_data = ${Ee(p)}(quantized_data - zero_point) * scale;
        ${w.setByOffset("global_idx","dequantized_data")};
    }`};return{name:"GatherBlockQuantized",shaderCache:{hint:`${t.cacheKey};${e.filter((_,y)=>y!==1).map(_=>_.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:e.length},(_,y)=>"rank")},getRunData:()=>({outputs:[{dims:u,dataType:p}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:h}),getShaderSource:g}},Pf=(e,t)=>{let r=e.inputs;Cl(r,t),e.compute(zl(e.inputs,t))},Lf=e=>he({blockSize:e.blockSize,gatherAxis:e.gatherAxis,quantizeAxis:e.quantizeAxis})}),Al,Ol,qf,Wf,sy=D(()=>{"use strict";ee(),re(),xe(),ie(),Al=e=>{if(!e||e.length!==2)throw new Error("GatherElements requires 2 inputs.");if(e[0].dims.length<1)throw new Error("GatherElements requires that the data input be rank >= 1.");if(e[0].dims.length!==e[1].dims.length)throw new Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},Ol=(e,t)=>{let r=e[0].dims,i=e[0].dataType,n=r.length,a=e[1].dims,s=e[1].dataType,u=R.normalizeAxis(t.axis,n),l=r[u],p=a.slice(0),c=R.size(p),h=M("input",i,n),g=M("indicesInput",s,a.length),_=j("output",i,p.length),y=[{type:12,data:c},{type:6,data:l},{type:12,data:u}];return y.push(...Z(r,a,p)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:p,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:y}),getShaderSource:v=>`
      ${v.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(h,g,_)}
      ${v.mainStart()}
      ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${_.offsetToIndices("global_idx")};

      var idx = ${g.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${h.type.indices}(outputIndices);
      ${h.indicesSet("inputIndices","uniforms.axis","u32(idx)")};
      let value = ${h.getByIndices("inputIndices")};

      ${_.setByOffset("global_idx","value")};
  }`}},qf=e=>he({axis:e.axis}),Wf=(e,t)=>{let r=e.inputs;Al(r),e.compute(Ol(e.inputs,t))}}),Rl,Bl,Vf,Gf,oy=D(()=>{"use strict";ee(),re(),ie(),Rl=e=>{if(!e)throw new Error("Input is missing");if(e.length<2||e.length>3)throw new Error("Invaid input number.");if(e.length===3&&e[2].dims.length>2)throw new Error("Invalid input shape of C");if(e[0].dataType!==e[1].dataType||e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("Input types are mismatched")},Bl=(e,t)=>{let r=e[0].dims.slice(),i=e[1].dims.slice(),[n,a,s]=Dp.getShapeOfGemmResult(r,t.transA,i,t.transB,e.length===3?e[2].dims:void 0),u=[n,a];if(!u)throw new Error("Can't use gemm on the given tensors");let l=16,p=Math.ceil(a/l),c=Math.ceil(n/l),h=!0,g=R.size(u),_=[{type:12,data:h?p:g},{type:12,data:n},{type:12,data:a},{type:12,data:s},{type:1,data:t.alpha},{type:1,data:t.beta}],y=["type","type"];e.length===3&&(_.push(...Z(e[2].dims)),y.push("rank")),_.push(...Z(u));let v=$=>{let w="";t.transA&&t.transB?w="value += a[k * uniforms.M + m] * b[n * uniforms.K + k];":t.transA&&!t.transB?w="value += a[k * uniforms.M + m] * b[k * uniforms.N + n];":!t.transA&&t.transB?w="value += a[m * uniforms.K + k] * b[n * uniforms.K + k];":!t.transA&&!t.transB&&(w="value += a[m * uniforms.K + k] * b[k * uniforms.N + n];");let T=t.alpha===1?"":"value *= uniforms.alpha;",k=M("a",e[0].dataType,e[0].dims),I=M("b",e[1].dataType,e[1].dims),C=k.type.value,A=null,x=[k,I];e.length===3&&(A=M("c",e[2].dataType,e[2].dims.length),x.push(A));let N=j("output",e[0].dataType,u.length);x.push(N);let L=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}];return`
  ${$.registerUniforms(L).declareVariables(...x)}

  ${$.mainStart()}
    ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let m = global_idx / uniforms.N;
    let n = global_idx % uniforms.N;

    var value = ${C}(0);
    for (var k: u32 = 0u; k < uniforms.K; k++) {
      ${w}
    }

    ${T}
    ${A!=null?`let cOffset = ${A.broadcastedIndicesToOffset("vec2(m, n)",N)}; value += ${C}(uniforms.beta) * ${A.getByOffset("cOffset")};`:""}
    output[global_idx] = value;
  }`},S=$=>{let w=M("a",e[0].dataType,e[0].dims),T=M("b",e[1].dataType,e[1].dims),k=null,I=[w,T];e.length===3&&(k=M("c",e[2].dataType,e[2].dims.length),I.push(k));let C=j("output",e[0].dataType,u.length);I.push(C);let A=[{name:"num_tile_n",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}],x="",N="";t.transA&&t.transB?(N=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${w.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${T.type.value}(0);
      }
      `,x="value += tile_a[k][local_id.y] * tile_b[local_id.x][k];"):t.transA&&!t.transB?(N=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${w.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${T.type.value}(0);
      }
      `,x="value += tile_a[k][local_id.y] * tile_b[k][local_id.x];"):!t.transA&&t.transB?(N=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${w.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${T.type.value}(0);
      }
      `,x="value += tile_a[local_id.y][k] * tile_b[local_id.x][k];"):!t.transA&&!t.transB&&(N=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${w.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${T.type.value}(0);
      }
      `,x="value += tile_a[local_id.y][k] * tile_b[k][local_id.x];");let L=t.alpha===1?"":"value *= uniforms.alpha;";return`
  ${$.registerUniforms(A).declareVariables(...I)}
  var<workgroup> tile_a: array<array<${w.type.storage}, ${l}>, ${l}>;
  var<workgroup> tile_b: array<array<${T.type.storage}, ${l}>, ${l}>;
  ${$.mainStart([l,l,1])}
    let tile_col_start = (workgroup_index % uniforms.num_tile_n) * ${l};
    let tile_row_start = (workgroup_index / uniforms.num_tile_n) * ${l};
    let num_tiles = (uniforms.K - 1) / ${l} + 1;
    var k_start = 0u;
    var value = ${C.type.value}(0);
    for (var t: u32 = 0u; t < num_tiles; t++) {
      ${N}
      k_start = k_start + ${l};
      workgroupBarrier();

      for (var k: u32 = 0u; k < ${l}; k++) {
        ${x}
      }
      workgroupBarrier();
    }

    ${L}
    let m = tile_row_start + local_id.y;
    let n = tile_col_start + local_id.x;
    ${k!=null?`let cOffset = ${k.broadcastedIndicesToOffset("vec2(m, n)",C)}; value += ${C.type.value}(uniforms.beta) * ${k.getByOffset("cOffset")};`:""}
    if (m < uniforms.M && n < uniforms.N) {
      output[m * uniforms.N + n] = value;
    }
  }`};return h?{name:"GemmShared",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:u,dataType:e[0].dataType}],dispatchGroup:{x:p*c},programUniforms:_}),getShaderSource:S}:{name:"Gemm",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:u,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:_}),getShaderSource:v}},Vf=e=>{let t=e.transA,r=e.transB,i=e.alpha,n=e.beta;return{transA:t,transB:r,alpha:i,beta:n,cacheKey:`${e.transA};${e.transB};${e.alpha===1}`}},Gf=(e,t)=>{Rl(e.inputs),e.compute(Bl(e.inputs,t))}}),rt,ut,kt,Tt,Ml,Nl,Dl,Ul,Pl,Ll,ql,Wl,Hf,Ff,uy=D(()=>{"use strict";ee(),re(),xe(),ie(),[rt,ut,kt,Tt]=[0,1,2,3],Ml=e=>{if(e[0].dims.length!==4)throw new Error("only 4-D tensor is supported.");if(e[0].dims.length!==e[1].dims.length)throw new Error("input dimensions must be equal to grid dimensions");if(e[0].dims.length-2!==e[1].dims[e[1].dims.length-1])throw new Error(`last dimension of grid must be equal to ${e[0].dims.length-2}`);if(e[0].dims[0]!==e[1].dims[0])throw new Error("grid batch size must match input batch size")},Nl=`
  fn gs_get_cubic_coeffs(x: f32) -> vec4<f32> {
    let cubic_alpha = -0.75f;
    let x_abs = abs(x);
    var coeffs: vec4<f32>;
    coeffs[0] = (((cubic_alpha * (x_abs + 1) - 5 * cubic_alpha) * (x_abs + 1) + 8 * cubic_alpha) * (x_abs + 1) - 4 * cubic_alpha);
    coeffs[1] = (((cubic_alpha + 2) * x_abs - (cubic_alpha + 3)) * x_abs * x_abs + 1);
    coeffs[2] = (((cubic_alpha + 2) * (1 - x_abs) - (cubic_alpha + 3)) * (1 - x_abs) * (1 - x_abs) + 1);
    coeffs[3] = (((cubic_alpha * (2 - x_abs) - 5 * cubic_alpha) * (2 - x_abs) + 8 * cubic_alpha) * (2 - x_abs) - 4 * cubic_alpha);
    return coeffs;
  }
`,Dl=e=>`
  fn gs_bicubic_interpolate(p: mat4x4<${e}>, x: f32, y: f32) -> ${e} {
    var v: vec4<f32>;
    var coeffs = gs_get_cubic_coeffs(x);
    for (var i = 0; i < 4; i++) {
      v[i] = coeffs[0] * p[i][0] + coeffs[1] * p[i][1] + coeffs[2] * p[i][2] + coeffs[3] * p[i][3];
    }
    coeffs = gs_get_cubic_coeffs(y);
    let pixel = ${e}(coeffs[0] * v[0] + coeffs[1] * v[1] + coeffs[2] * v[2] + coeffs[3] * v[3]);
    return pixel;
  }
`,Ul=e=>`
  fn gs_denormalize(n: f32, length: i32) -> f32 {
    ${e.alignCorners===0?`
    // alignCorners: false => [-1, 1] to [-0.5, length - 0.5]
    return ((n + 1.0) * f32(length) - 1.0) / 2.0;
    `:`
    // alignCorners: true => [-1, 1] to [0, length - 1]
    return (n + 1.0) / 2.0 * (f32(length - 1));
    `}
  }
`,Pl=e=>`
  ${e.paddingMode==="reflection"?`
      fn gs_reflect(x: i32, x_min: f32, x_max: f32) -> u32 {
        var dx = 0.0;
        var fx = f32(x);
        let range = x_max - x_min;
        if (fx < x_min) {
          dx = x_min - fx;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_min + r;
          } else {
            fx = x_max - r;
          }
        } else if (fx > x_max) {
          dx = fx - x_max;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_max - r;
          } else {
            fx = x_min + r;
          }
        }
        return u32(fx);
      }`:""}
`,Ll=(e,t,r)=>`
  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ${t} {
     var pixel = ${t}(0);
     var indices = vec4<u32>(0);
     indices[${rt}] = batch;
     indices[${ut}] = channel;`+(()=>{switch(r.paddingMode){case"zeros":return`
          if (r >= 0 && r < H && c >=0 && c < W) {
            indices[${kt}] = u32(r);
            indices[${Tt}] = u32(c);
          } else {
            return ${t}(0);
          }
        `;case"border":return`
          indices[${kt}] = u32(clamp(r, 0, H - 1));
          indices[${Tt}] = u32(clamp(c, 0, W - 1));
        `;case"reflection":return`
          indices[${kt}] = gs_reflect(r, border[1], border[3]);
          indices[${Tt}] = gs_reflect(c, border[0], border[2]);
        `;default:throw new Error(`padding mode ${r.paddingMode} is not supported`)}})()+`
    return ${e.getByIndices("indices")};
  }
`,ql=(e,t,r)=>(()=>{switch(r.mode){case"nearest":return`
          let result = pixel_at_grid(i32(round(y)), i32(round(x)), H_in, W_in, indices[${rt}], indices[${ut}], border);
        `;case"bilinear":return`
          let x1 = i32(floor(x));
          let y1 = i32(floor(y));
          let x2 = x1 + 1;
          let y2 = y1 + 1;

          let p11 = pixel_at_grid(y1, x1, H_in, W_in, indices[${rt}], indices[${ut}], border);
          let p12 = pixel_at_grid(y1, x2, H_in, W_in, indices[${rt}], indices[${ut}], border);
          let p21 = pixel_at_grid(y2, x1, H_in, W_in, indices[${rt}], indices[${ut}], border);
          let p22 = pixel_at_grid(y2, x2, H_in, W_in, indices[${rt}], indices[${ut}], border);

          let dx2 = ${t}(f32(x2) - x);
          let dx1 = ${t}(x - f32(x1));
          let dy2 = ${t}(f32(y2) - y);
          let dy1 = ${t}(y - f32(y1));
          let result = dy2 * (dx2 * p11 + dx1 * p12) + dy1 * (dx2 * p21 + dx1 * p22);
        `;case"bicubic":return`
          let x0 = i32(floor(x)) - 1;
          let y0 = i32(floor(y)) - 1;
          var p: mat4x4<${t}>;
          for (var h = 0; h < 4; h++) {
            for (var w = 0; w < 4; w++) {
              p[h][w] = pixel_at_grid(h + y0, w + x0, H_in, W_in, indices[${rt}], indices[${ut}], border);
            }
          }

          let dx = x - f32(x0 + 1);
          let dy = y - f32(y0 + 1);
          let result = gs_bicubic_interpolate(p, dx, dy);
        `;default:throw new Error(`mode ${r.mode} is not supported`)}})()+`${e.setByOffset("global_idx","result")}`,Wl=(e,t)=>{let r=M("x",e[0].dataType,e[0].dims.length),i=[e[1].dims[0],e[1].dims[1],e[1].dims[2]],n=M("grid",e[1].dataType,i.length,2),a=[e[0].dims[0],e[0].dims[1],e[1].dims[1],e[1].dims[2]];t.format==="NHWC"&&(a=[e[0].dims[0],e[1].dims[1],e[1].dims[2],e[0].dims[3]],[rt,ut,kt,Tt]=[0,3,1,2]);let s=j("output",e[0].dataType,a.length),u=r.type.value,l=R.size(a),p=[{type:12,data:l},...Z(e[0].dims,i,a)],c=h=>`
  ${h.registerUniform("output_size","u32").declareVariables(r,n,s)}
  ${Nl}
  ${Dl(u)}
  ${Ul(t)}
  ${Pl(t)}
  ${Ll(r,u,t)}

  ${h.mainStart()}
    ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let H_in = i32(uniforms.x_shape[${kt}]);
      let W_in = i32(uniforms.x_shape[${Tt}]);

      ${t.alignCorners===0?`
      let x_min = -0.5;
      let x_max = f32(W_in) - 0.5;
      let y_min = -0.5;
      let y_max = f32(H_in) - 0.5;
      `:`
      let x_min = 0.0;
      let x_max = f32(W_in) - 1.0;
      let y_min = 0.0;
      let y_max = f32(H_in) - 1.0;
      `};
      let border = vec4<f32>(x_min, y_min, x_max, y_max);

      let indices = ${s.offsetToIndices("global_idx")};
      var grid_indices = vec3<u32>(indices[${rt}], indices[${kt}], indices[${Tt}]);
      let nxy = ${n.getByIndices("grid_indices")};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${ql(s,u,t)}
  }`;return{name:"GridSample",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:["type","type"]},getRunData:h=>{let g=R.size(a);return{outputs:[{dims:a,dataType:h[0].dataType}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:p}},getShaderSource:c}},Hf=(e,t)=>{Ml(e.inputs),e.compute(Wl(e.inputs,t))},Ff=e=>he({alignCorners:e.align_corners,mode:e.mode,paddingMode:e.padding_mode,format:e.format})}),Be,Vl,jf,fn,Gl,mr,Kf,Zf=D(()=>{"use strict";ee(),re(),xe(),ua(),pa(),ie(),$t(),Be=(e,t)=>e.length>t&&e[t].dims.length>0?e[t]:void 0,Vl=(e,t)=>{let r=e[0],i=Be(e,1),n=Be(e,2),a=Be(e,3),s=Be(e,4),u=Be(e,5),l=Be(e,6),p=Be(e,7);if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let c=r.dims[0],h=r.dims[1],g=r.dims.length===3?r.dims[2]:t.numHeads*r.dims[4],_=h,y=0,v=0,S=Math.floor(g/t.numHeads);if(l&&p&&R.size(l.dims)&&R.size(p.dims)){if(l.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(l.dims[0]!==c||l.dims[1]!==t.numHeads||l.dims[3]!==S)throw new Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(p.dims[0]!==c||p.dims[1]!==t.numHeads||p.dims[3]!==S)throw new Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(l.dims[2]!==p.dims[2])throw new Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(p.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');y=l.dims[2],v=l.dims[2]}else if(l&&R.size(l.dims)||p&&R.size(p.dims))throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let $;if(i&&R.size(i.dims)>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(i.dims.length<3||i.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==i.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(i.dims.length===3){if(i.dims[2]!==r.dims[2])throw new Error('Input "query" and "key" shall have same dim 2 (hidden_size)');$=2,_=i.dims[1]}else if(i.dims.length===5){if(i.dims[2]!==t.numHeads||i.dims[3]!==2||i.dims[4]!==S)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(n)throw new Error('Expect "value" be none when "key" has packed kv format.');$=5,_=i.dims[1]}else{if(i.dims[1]!==t.numHeads||i.dims[3]!==S)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');$=0,_=i.dims[2]}}else{if(r.dims.length!==5)throw new Error('Input "query" is expected to have 5 dimensions when key is empty');if(r.dims[2]!==t.numHeads||r.dims[3]!==3)throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');$=3}if(a&&R.size(a.dims)>0){if(a.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimension');if(i&&i.dims.length===5&&i.dims[3]===2)throw new Error("bias is not allowed for packed kv.")}let w=y+_,T=0;if(s&&R.size(s.dims)>0){T=8;let A=s.dims;throw A.length===1?A[0]===c?T=1:A[0]===3*c+2&&(T=3):A.length===2&&A[0]===c&&A[1]===w&&(T=5),T===8?new Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):new Error("Mask not supported")}let k=!1,I=g;if(n&&R.size(n.dims)>0){if(n.dims.length!==3&&n.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==n.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(n.dims.length===3){if(_!==n.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');I=n.dims[2]}else{if(_!==n.dims[2])throw new Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');I=n.dims[1]*n.dims[3],k=!0}}let C=!1;if(s&&R.size(s.dims)>0)throw new Error("Key padding mask is not supported");if(u&&R.size(u.dims)>0){if(u.dims.length!==4)throw new Error('Input "attention_bias" is expected to have 4 dimensions');if(u.dims[0]!==c||u.dims[1]!==t.numHeads||u.dims[2]!==h||u.dims[3]!==w)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:c,sequenceLength:h,pastSequenceLength:y,kvSequenceLength:_,totalSequenceLength:w,maxSequenceLength:v,inputHiddenSize:0,hiddenSize:g,vHiddenSize:I,headSize:S,vHeadSize:Math.floor(I/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:T,scale:t.scale,broadcastResPosBias:C,passPastInKv:k,qkvFormat:$}},jf=e=>he({...e}),fn=he({perm:[0,2,1,3]}),Gl=(e,t,r,i,n,a,s)=>{let u=[i,n,a],l=R.size(u),p=[{type:12,data:l},{type:12,data:s},{type:12,data:a}],c=h=>{let g=j("qkv_with_bias",t.dataType,u),_=M("qkv",t.dataType,u),y=M("bias",r.dataType,u),v=[{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}];return`
  ${h.registerUniforms(v).declareVariables(_,y,g)}
  ${h.mainStart()}
    ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`};return e.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:u,dataType:t.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:p}),getShaderSource:c},{inputs:[t,r],outputs:[-1]})[0]},mr=(e,t,r,i,n,a,s,u)=>{let l=a;if(s&&R.size(s.dims)>0){if(i===1)throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return l=Gl(e,a,s,t,i,r*n,u),l=l.reshape([t,i,r,n]),r===1||i===1?l:e.compute(Ue(l,fn.perm),{inputs:[l],outputs:[-1]})[0]}else return a.dims.length===3&&(l=a.reshape([t,i,r,n])),r===1||i===1?l:e.compute(Ue(l,fn.perm),{inputs:[l],outputs:[-1]})[0]},Kf=(e,t)=>{let r=Vl(e.inputs,t),i=e.inputs[0],n=Be(e.inputs,1),a=Be(e.inputs,2),s=Be(e.inputs,3),u=Be(e.inputs,4),l=Be(e.inputs,5),p=Be(e.inputs,6),c=Be(e.inputs,7);if(i.dims.length===5)throw new Error("Packed QKV is not implemented");if(n?.dims.length===5)throw new Error("Packed KV is not implemented");let h=n&&a&&n.dims.length===4&&a.dims.length===4,g=mr(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,i,s,0);if(h)return _r(e,g,n,a,u,void 0,p,c,l,r);if(!n||!a)throw new Error("key and value must be provided");let _=mr(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.headSize,n,s,r.hiddenSize),y=mr(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.vHeadSize,a,s,2*r.hiddenSize);_r(e,g,_,y,u,void 0,p,c,l,r)}}),Hl,Fl,jl,Kl,Hn,Qf,Xf,Yf=D(()=>{"use strict";ee(),re(),xe(),ie(),Hl=e=>{if(!e||e.length<1)throw new Error("too few inputs")},Fl=(e,t)=>{let r=[],i=t.numOutputs;return e[1].dims[0]>0&&(e[1].getBigInt64Array().forEach(n=>r.push(Number(n))),i=r.length),he({numOutputs:i,axis:t.axis,splitSizes:r})},jl=e=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${e}u; i += 1u ) {
    if (index < ${K("uniforms.size_in_split_axis","i",e)}) {
        return i;
    }
    }
    return ${e}u;
}`,Kl=e=>{let t=e.length,r=[];for(let i=0;i<t;++i){let n=e[i].setByIndices("indices","input[global_idx]");t===1?r.push(n):i===0?r.push(`if (output_number == ${i}u) { ${n} }`):i===t-1?r.push(`else { ${n} }`):r.push(`else if (output_number == ${i}) { ${n} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${e[0].type.indices}, global_idx: u32) {
        ${r.join(`
`)}
      }`},Hn=(e,t)=>{let r=e[0].dims,i=R.size(r),n=e[0].dataType,a=R.normalizeAxis(t.axis,r.length),s=new Array(t.numOutputs),u=M("input",n,r.length),l=new Array(t.numOutputs),p=[],c=[],h=0,g=[{type:12,data:i}];for(let y=0;y<t.numOutputs;y++){h+=t.splitSizes[y],l[y]=h;let v=r.slice();v[a]=t.splitSizes[y],c.push(v),s[y]=j(`output${y}`,n,v.length),p.push({dims:c[y],dataType:e[0].dataType})}g.push({type:12,data:l},...Z(r,...c));let _=y=>`
  ${y.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",l.length).declareVariables(u,...s)}
  ${jl(l.length)}
  ${Kl(s)}

  ${y.mainStart()}
    ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${u.offsetToIndices("global_idx")};
    var index = ${u.indicesGet("indices",a)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${K("uniforms.size_in_split_axis","output_number - 1u",l.length)};
      ${u.indicesSet("indices",a,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`;return{name:"Split",shaderCache:{hint:t.cacheKey,inputDependencies:["rank"]},getShaderSource:_,getRunData:()=>({outputs:p,dispatchGroup:{x:Math.ceil(i/64)},programUniforms:g})}},Qf=(e,t)=>{Hl(e.inputs);let r=e.inputs.length===1?t:Fl(e.inputs,t);e.compute(Hn(e.inputs,r),{inputs:[0]})},Xf=e=>{let t=e.axis,r=e.splitSizes,i=e.numOutputs<0?r.length:e.numOutputs;if(i!==r.length)throw new Error("numOutputs and splitSizes length must be equal");return he({axis:t,numOutputs:i,splitSizes:r})}}),Zl,ti,Jf,eh=D(()=>{"use strict";ee(),re(),xe(),ie(),Zl=(e,t)=>{let[r,i,n,a]=e,{numHeads:s,rotaryEmbeddingDim:u}=t;if(r.dims.length!==3&&r.dims.length!==4)throw new Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${r.dims.length}`);if(!R.areEqual(i.dims,[])&&!R.areEqual(i.dims,[1])&&i.dims.length!==2)throw new Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${i.dims.length}`);if(n.dims.length!==2)throw new Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${n.dims.length}`);if(a.dims.length!==2)throw new Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${a.dims.length}`);if(!R.areEqual(n.dims,a.dims))throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(u>0&&s===0)throw new Error("num_heads must be provided if rotary_embedding_dim is specified");let l=r.dims[0],p=r.dims[r.dims.length-2],c=n.dims[0],h=R.sizeFromDimension(r.dims,1)/p,g=u===0?n.dims[1]*2:h/s;if(u>g)throw new Error("rotary_embedding_dim must be less than or equal to head_size");if(i.dims.length===2){if(l!==i.dims[0])throw new Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${i.dims[0]}`);if(p!==i.dims[1])throw new Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${i.dims[1]}`)}if(p>c)throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported");if(g/2!==n.dims[1]&&u/2!==n.dims[1])throw new Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${n.dims[1]}`)},ti=(e,t)=>{let{interleaved:r,numHeads:i,rotaryEmbeddingDim:n,scale:a}=t,s=e[0].dims[0],u=R.sizeFromDimension(e[0].dims,1),l=e[0].dims[e[0].dims.length-2],p=u/l,c=e[2].dims[1],h=n===0?c*2:p/i,g=new Array(s,l,p/h,h-c),_=R.computeStrides(g),y=[{type:1,data:a},{type:12,data:g},{type:12,data:_},...e[0].dims.length===3?new Array({type:12,data:[u,p,h,1]}):[],...e[0].dims.length===4?new Array({type:12,data:[u,h,l*h,1]}):[],...Z(e[0].dims,e[1].dims,e[2].dims,e[3].dims,e[0].dims)],v=S=>{let $=M("input",e[0].dataType,e[0].dims.length),w=M("position_ids",e[1].dataType,e[1].dims.length),T=M("cos_cache",e[2].dataType,e[2].dims.length),k=M("sin_cache",e[3].dataType,e[3].dims.length),I=j("output",e[0].dataType,e[0].dims.length);return S.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:g.length},{name:"global_strides",type:"u32",length:_.length},{name:"input_output_strides",type:"u32",length:_.length}]),`
        ${S.declareVariables($,w,T,k,I)}

        ${S.mainStart(Kt)}
          let half_rotary_emb_dim = uniforms.${T.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${S.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${w.broadcastedIndicesToOffset("bsnh.xy",j("",w.type.tensor,2))};
            let position_id =
                u32(${w.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${r});
            let j = i + select(half_rotary_emb_dim, 1, ${r});
            let re = ${$.getByOffset("i")} * ${T.get("position_id","bsnh[3]")} -
                ${$.getByOffset("j")} * ${k.get("position_id","bsnh[3]")};
            ${I.setByOffset("i","re")}
            let im = ${$.getByOffset("i")} * ${k.get("position_id","bsnh[3]")} +
                ${$.getByOffset("j")} * ${T.get("position_id","bsnh[3]")};
            ${I.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${I.setByOffset("k",$.getByOffset("k"))}
          }
        }`};return{name:"RotaryEmbedding",shaderCache:{hint:he({interleaved:r}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:v,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(R.size(g)/Kt)},programUniforms:y})}},Jf=(e,t)=>{Zl(e.inputs,t),e.compute(ti(e.inputs,t))}}),Ql,Xl,hn,Yl,th,ly=D(()=>{"use strict";xe(),ee(),pa(),Zf(),Yf(),$t(),eh(),ie(),Ql=(e,t)=>{if(t.doRotary&&e.length<=7)throw new Error("cos_cache and sin_cache inputs are required if do_rotary is specified");let r=e[0],i=e[1],n=e[2],a=e[3],s=e[4];if(t.doRotary!==0&&e.length<=7)throw new Error("cos_cast and sin_cache are expected if do_rotary attribute is non-zero");if(t.localWindowSize!==-1)throw new Error("Local attention is not supported");if(t.softcap!==0)throw new Error("Softcap is not supported");if(t.rotaryInterleaved!==0)throw new Error("Rotary interleaved is not supported");if(t.smoothSoftmax)throw new Error("Smooth softmax is not supported");if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let u=!1,l=r.dims[0],p=r.dims[1],c=r.dims.length===3?u?r.dims[2]/3:r.dims[2]:t.numHeads*r.dims[4],h=p,g=0,_=!i||i.dims.length===0,y=Math.floor(_?c/(t.numHeads+2*t.kvNumHeads):c/t.numHeads);_&&(c=y*t.numHeads);let v=a&&a.dims.length!==0,S=s&&s.dims.length!==0;if(v&&a.dims.length===4&&a.dims[0]===l&&a.dims[1]!==t.kvNumHeads&&a.dims[2]===t.kvNumHeads&&a.dims[3]===y)throw new Error("BSNH pastKey/pastValue is not supported");if(v&&S){if(a.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(s.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');g=a.dims[2]}else if(v||S)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let $=1;if(i&&i.dims.length>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(i.dims.length<3||i.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==i.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(i.dims.length===3){if(r.dims[2]%i.dims[2]!==0)throw new Error('Dimension 2 of "query" should be a multiple of "key"');h=i.dims[1]}else if(i.dims.length===5){if(i.dims[2]!==t.numHeads||i.dims[3]!==2||i.dims[4]!==y)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(n)throw new Error('Expect "value" be none when "key" has packed kv format.');h=i.dims[1]}else{if(i.dims[1]!==t.numHeads||i.dims[3]!==y)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');h=i.dims[2]}}else{if(r.dims.length!==3&&r.dims.length!==5)throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(r.dims.length===5&&(r.dims[2]!==t.numHeads||r.dims[3]!==3))throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');$=3}let w=0,T=!1,k=t.kvNumHeads?y*t.kvNumHeads:c;if(n&&n.dims.length>0){if(n.dims.length!==3&&n.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==n.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(n.dims.length===3){if(h!==n.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');k=n.dims[2]}else{if(h!==n.dims[2])throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');k=n.dims[1]*n.dims[3],T=!0}}let I=e.length>4?e[5]:void 0;if(I){if(I.dims.length===0)throw new Error("seqlens_k must be at least 1D, got scalar.");let C=I.dims.reduce((A,x)=>A*x,1);if(C!==l)throw new Error(`seqlens_k must have batch_size (${l}) elements, got ${C}.`);for(let A=0;A<I.dims.length;A++)if(I.dims[A]!==1&&I.dims[A]!==l)throw new Error(`seqlens_k has unexpected shape. Each dimension must be 1 or batch_size (${l}), got dims[${A}] = ${I.dims[A]}.`)}return{batchSize:l,sequenceLength:p,pastSequenceLength:g,kvSequenceLength:h,totalSequenceLength:-1,maxSequenceLength:-1,inputHiddenSize:0,hiddenSize:c,vHiddenSize:k,headSize:y,vHeadSize:Math.floor(k/t.kvNumHeads),numHeads:t.numHeads,kvNumHeads:t.kvNumHeads,nReps:t.numHeads/t.kvNumHeads,pastPresentShareBuffer:!1,maskType:w,scale:t.scale,broadcastResPosBias:!1,passPastInKv:T,qkvFormat:$}},Xl=he({perm:[0,2,1,3]}),hn=(e,t,r)=>{let i=t,n=r.kvNumHeads;return t.dims.length===3&&r.kvSequenceLength!==0&&(i=t.reshape([r.batchSize,r.kvSequenceLength,n,r.headSize]),i=e.compute(Ue(i,Xl.perm),{inputs:[i],outputs:[-1]})[0]),i},Yl=(e,t,r,i)=>{let n=7,a=["type","type"],s=[e*t],u=e*t,l=[{type:12,data:u},{type:12,data:t},{type:12,data:e}],p=c=>{let h=M("seq_lens",r.dataType,r.dims),g=M("total_seq_lens",i.dataType,i.dims),_=j("pos_ids",n,s),y=[{name:"output_size",type:"u32"},{name:"sequence_length",type:"u32"},{name:"batch_size",type:"u32"}];return`
  ${c.registerUniforms(y).declareVariables(h,g,_)}
  ${c.mainStart()}
    ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let total_sequence_length = u32(${g.getByOffset("0")});
    let is_subsequent_prompt = uniforms.sequence_length > 1 && uniforms.sequence_length != total_sequence_length;
    let is_first_prompt = !is_subsequent_prompt && uniforms.sequence_length == total_sequence_length;
    let batch_idx = global_idx / uniforms.sequence_length;
    let sequence_idx = i32(global_idx % uniforms.sequence_length);
    var pos_id: i32 = 0;
    let seqlen = ${h.getByOffset("batch_idx")};
    let total_seqlen = seqlen + 1;
    if (is_first_prompt) {
      if (sequence_idx < total_seqlen) {
        pos_id = sequence_idx;
      } else {
        pos_id = 1;
      }
      ${_.setByOffset("global_idx","pos_id")}
    } else if (is_subsequent_prompt) {
      let past_seqlen = total_seqlen - i32(uniforms.sequence_length);
      if (past_seqlen + sequence_idx < total_seqlen) {
        pos_id = past_seqlen + sequence_idx;
      } else {
        pos_id = 1;
      }
      ${_.setByOffset("global_idx","pos_id")}
    } else if (global_idx < uniforms.batch_size) {
      ${_.setByOffset("global_idx","seqlen")}
    };
  }
  `};return{name:"GeneratePositionIds",shaderCache:{hint:`${e};${t}`,inputDependencies:a},getRunData:()=>({outputs:[{dims:s,dataType:n}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:l}),getShaderSource:p}},th=(e,t)=>{if(e.inputs.length>14&&e.inputs[14]||e.inputs.length>15&&e.inputs[15])throw new Error("GroupQueryAttention (JSEP): q_norm_weight / k_norm_weight inputs are not supported. The per-head Q/K RMS normalization prologue is implemented only on the CUDA and native WebGPU EPs.");let r=Ql(e.inputs,t);if(e.inputs[0].dims.length===5)throw new Error("Packed QKV is not implemented");if(e.inputs[1]?.dims.length===5)throw new Error("Packed KV is not implemented");let i=e.inputs[0],n=e.inputs[1]&&e.inputs[1].dims.length>0?e.inputs[1]:void 0,a=e.inputs[2]&&e.inputs[2].dims.length>0?e.inputs[2]:void 0,s=e.inputs[3]&&e.inputs[3].dims.length!==0?e.inputs[3]:void 0,u=e.inputs[4]&&e.inputs[4].dims.length!==0?e.inputs[4]:void 0,l=e.inputs.length>4?e.inputs[5]:void 0,p=e.inputs.length>5?e.inputs[6]:void 0,c=r.kvNumHeads?r.kvNumHeads:r.numHeads,h=he({axis:2,numOutputs:3,splitSizes:[r.numHeads*r.headSize,c*r.headSize,c*r.headSize]}),[g,_,y]=!n&&!a?e.compute(Hn([i],h),{inputs:[i],outputs:[-1,-1,-1]}):[i,n,a],v,S;if(t.doRotary){let k=e.compute(Yl(r.batchSize,r.sequenceLength,l,p),{inputs:[l,p],outputs:[-1]})[0],I=e.inputs[7],C=e.inputs[8],A=he({interleaved:t.rotaryInterleaved!==0,numHeads:r.numHeads,rotaryEmbeddingDim:0,scale:t.scale}),x=[g,k,I,C],N=[-1];v=e.compute(ti(x,A),{inputs:x,outputs:N})[0],x.splice(0,1,_);let L=he({interleaved:t.rotaryInterleaved!==0,numHeads:r.kvNumHeads,rotaryEmbeddingDim:0,scale:t.scale});S=e.compute(ti(x,L),{inputs:x,outputs:N})[0]}let $=mr(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,t.doRotary?v:g,void 0,0),w=hn(e,t.doRotary?S:_,r),T=hn(e,y,r);_r(e,$,w,T,void 0,void 0,s,u,void 0,r,l,p)}}),mn,Jl,ed,rh,dy=D(()=>{"use strict";ee(),re(),$t(),ie(),mn=(e,t,r,i,n,a,s,u)=>{let l=ve(a),p=l===1?"f32":`vec${l}f`,c=l===1?"vec2f":`mat2x${l}f`,h=n*s,g=64;h===1&&(g=256);let _=[n,s,a/l],y=[n,s,2],v=["rank","type","type"],S=[];S.push(...Z(_,y));let $=w=>{let T=M("x",t.dataType,3,l),k=M("scale",r.dataType,r.dims),I=M("bias",i.dataType,i.dims),C=j("output",1,3,2),A=[T,k,I,C];return`
  var<workgroup> workgroup_shared : array<${c}, ${g}>;
  const workgroup_size = ${g}u;
  ${w.declareVariables(...A)}
  ${w.mainStart(g)}
    let batch = workgroup_index / uniforms.x_shape[1];
    let channel = workgroup_index % uniforms.x_shape[1];
    let hight = uniforms.x_shape[2];
    // initialize workgroup memory
    var sum = ${p}(0);
    var squared_sum = ${p}(0);
    for (var h = local_idx; h < hight; h += workgroup_size) {
      let value = ${p}(${T.get("batch","channel","h")});
      sum += value;
      squared_sum += value * value;
    }
    workgroup_shared[local_idx] = ${c}(sum, squared_sum);
    workgroupBarrier();

    for (var currSize = workgroup_size >> 1;  currSize > 0; currSize = currSize >> 1) {
      if (local_idx < currSize) {
        workgroup_shared[local_idx] = workgroup_shared[local_idx] + workgroup_shared[local_idx + currSize];
      }
      workgroupBarrier();
    }
    if (local_idx == 0) {
      let sum_final = ${wt("workgroup_shared[0][0]",l)} / f32(hight * ${l});
      let squared_sum_final = ${wt("workgroup_shared[0][1]",l)} / f32(hight * ${l});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${u}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`};return e.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${l};${u};${g}`,inputDependencies:v},getRunData:()=>({outputs:[{dims:y,dataType:1}],dispatchGroup:{x:h},programUniforms:S}),getShaderSource:$},{inputs:[t,r,i],outputs:[-1]})[0]},Jl=(e,t,r)=>{let i=t[0].dims,n=i,a=2,s=i[0],u=i[1],l=R.sizeFromDimension(i,a),p=ve(l),c=R.size(n)/p,h=mn(e,t[0],t[1],t[2],s,l,u,r.epsilon),g=[s,u,l/p],_=[s,u],y=["type","none"],v=S=>{let $=M("x",t[0].dataType,g.length,p),w=M("scale_shift",1,_.length,2),T=j("output",t[0].dataType,g.length,p),k=[$,w,T];return`
  ${S.registerUniform("output_size","u32").declareVariables(...k)}
  ${S.mainStart()}
  ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${T.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${w.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${$.getByOffset("global_idx")} * ${T.type.value}(scale_shift.x) + ${T.type.value}(scale_shift.y);
      ${T.setByOffset("global_idx","value")};
  }`};e.compute({name:"InstanceNormalization",shaderCache:{hint:`${p}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:n,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:[{type:12,data:c},...Z(g,_,g)]}),getShaderSource:v},{inputs:[t[0],h]})},ed=(e,t,r)=>{let i=t[0].dims,n=i,a=i[0],s=i[i.length-1],u=R.sizeFromDimension(i,1)/s,l=ve(s),p=R.size(n)/l,c=[{type:12,data:u},{type:12,data:Math.floor(s/l)}],h=["type","type"],g=!1,_=[0,i.length-1];for(let $=0;$<i.length-2;$++)g=g||i[$+1]!==1,_.push($+1);g=g&&i[i.length-1]!==1;let y=g?e.compute(Ue(e.inputs[0],_),{inputs:[e.inputs[0]],outputs:[-1]})[0]:e.inputs[0].reshape(Array.from({length:i.length},($,w)=>i[_[w]])),v=mn(e,y,t[1],t[2],a,u,s,r.epsilon),S=$=>{let w=Ce(t[0].dataType),T=l===1?"vec2f":`mat${l}x2f`,k=A=>{let x=A===0?"x":"y",N=l===1?"f32":`vec${l}f`;switch(l){case 1:return`${w}(${N}(scale.${x}))`;case 2:return`vec2<${w}>(${N}(scale[0].${x}, scale[1].${x}))`;case 4:return`vec4<${w}>(${N}(scale[0].${x}, scale[1].${x}, scale[2].${x}, scale[3].${x}))`;default:throw new Error(`Not supported compoents ${l}`)}},I=M("input",t[0].dataType,t[0].dims,l),C=j("output",t[0].dataType,n,l);return`
  @group(0) @binding(0) var<storage, read> input : array<${I.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${T}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${C.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${$.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${k(0)}, ${k(1)});
  }`};e.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${l}`,inputDependencies:h},getRunData:()=>({outputs:[{dims:n,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:c}),getShaderSource:S},{inputs:[t[0],v]})},rh=(e,t)=>{t.format==="NHWC"?ed(e,e.inputs,t):Jl(e,e.inputs,t)}}),td,rd,ih,py=D(()=>{"use strict";ee(),re(),ie(),td=e=>{if(!e||e.length<2)throw new Error("layerNorm requires at least 2 inputs.")},rd=(e,t,r)=>{let i=t.simplified,n=e[0].dims,a=e[1],s=!i&&e[2],u=n,l=R.normalizeAxis(t.axis,n.length),p=R.sizeToDimension(n,l),c=R.sizeFromDimension(n,l),h=R.size(a.dims),g=s?R.size(s.dims):0;if(h!==c||s&&g!==c)throw new Error(`Size of X.shape()[axis:] == ${c}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${h} and bias size of ${g}`);let _=[];for(let I=0;I<n.length;++I)I<l?_.push(n[I]):_.push(1);let y=ve(c),v=["type","type"],S=[{type:12,data:p},{type:1,data:c},{type:12,data:Math.floor(c/y)},{type:1,data:t.epsilon}];s&&v.push("type");let $=r>1,w=r>2,T=I=>{let C=Ce(e[0].dataType),A=[M("x",e[0].dataType,e[0].dims,y),M("scale",a.dataType,a.dims,y)];s&&A.push(M("bias",s.dataType,s.dims,y)),A.push(j("output",e[0].dataType,u,y)),$&&A.push(j("mean_data_output",1,_)),w&&A.push(j("inv_std_output",1,_));let x=[{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}];return`
  ${I.registerUniforms(x).declareVariables(...A)}
  ${I.mainStart()}
    ${I.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${Nn("f32",y)};
    var mean_square_vector = ${Nn("f32",y)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${Ft(C,y,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${wt("mean_vector",y)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${wt("mean_square_vector",y)} / uniforms.norm_size ${i?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${Ft(C,y,"x[j + offset]")};
      let f32scale = ${Ft(C,y,"scale[j]")};
      output[j + offset] = ${A[0].type.value}((f32input ${i?"":"- mean"}) * inv_std_dev * f32scale
        ${s?`+ ${Ft(C,y,"bias[j]")}`:""}
      );
    }

    ${$?"mean_data_output[global_idx] = mean":""};
    ${w?"inv_std_output[global_idx] = inv_std_dev":""};
  }`},k=[{dims:u,dataType:e[0].dataType}];return $&&k.push({dims:_,dataType:1}),w&&k.push({dims:_,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${y};${r};${i}`,inputDependencies:v},getRunData:()=>({outputs:k,dispatchGroup:{x:Math.ceil(p/64)},programUniforms:S}),getShaderSource:T}},ih=(e,t)=>{td(e.inputs),e.compute(rd(e.inputs,t,e.outputCount))}}),id,nh,cy=D(()=>{"use strict";re(),ga(),ya(),id=e=>{if(!e||e.length!==2)throw new Error("MatMul requires 2 inputs.");if(e[0].dims[e[0].dims.length-1]!==e[1].dims[e[1].dims.length-2])throw new Error("shared dimension does not match.")},nh=e=>{id(e.inputs);let t=jt.calcShape(e.inputs[0].dims,e.inputs[1].dims,!0);if(!t)throw new Error("Can't use matmul on the given tensors");let r=t[t.length-1],i=e.inputs[0].dims[e.inputs[0].dims.length-1];if(r<8&&i<8)e.compute(ma(e.inputs,{activation:""},t));else{let n=t[t.length-2],a=R.size(e.inputs[0].dims.slice(0,-2)),s=R.size(e.inputs[1].dims.slice(0,-2));if(a!==1&&n===1&&s===1){let u=e.inputs[0].reshape([1,a,i]),l=e.inputs[1].reshape([1,i,r]),p=[1,a,r],c=[u,l];e.compute(ei(c,{activation:""},t,p),{inputs:c})}else e.compute(ei(e.inputs,{activation:""},t))}}}),nd,ad,sd,ah,sh,fy=D(()=>{"use strict";ee(),re(),xe(),ie(),nd=(e,t)=>{if(e.length<3||e.length>4)throw new Error("MatMulNBits requires 3 or 4 inputs");let r=e[0],i=r.dims.length;if(r.dims[i-1]!==t.k)throw new Error("The last dim of input shape does not match the k value");let n=Math.floor((t.k+t.blockSize-1)/t.blockSize),a=t.blockSize/8*t.bits,s=e[1];if(!R.areEqual(s.dims,[t.n,n,a]))throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let u=e[2].dims;if(R.size(u)!==t.n*n)throw new Error("scales input size error.");if(e.length===4){let l=e[3].dims,p=t.n*(t.bits===8?n:Math.floor((n*t.bits+7)/8));if(R.size(l)!==p)throw new Error("zeroPoints input size error.")}},ad=(e,t)=>{let r=e[0].dims,i=r.length,n=r[i-2],a=t.k,s=t.n,u=r.slice(0,i-2),l=R.size(u),p=e[1].dims[2]/4,c=e[0].dataType,h=ve(t.k),g=ve(p),_=ve(s),y=u.concat([n,s]),v=n>1&&s/_%2===0?2:1,S=R.size(y)/_/v,$=64,w=[],T=[l,n,a/h],k=R.convertShape(e[1].dims).slice();k.splice(-1,1,p/g),w.push(...Z(T)),w.push(...Z(k)),w.push(...Z(e[2].dims)),e.length===4&&w.push(...Z(R.convertShape(e[3].dims)));let I=[l,n,s/_];w.push(...Z(I));let C=A=>{let x=T.length,N=M("a",e[0].dataType,x,h),L=M("b",12,k.length,g),X=M("scales",e[2].dataType,e[2].dims.length),Q=[N,L,X],J=e.length===4?M("zero_points",12,e[3].dims.length):void 0;J&&Q.push(J);let O=I.length,W=j("output",e[0].dataType,O,_),Y=Ce(e[0].dataType),P=(()=>{switch(h){case 1:return`array<${Y}, 8>`;case 2:return`mat4x2<${Y}>`;case 4:return`mat2x4<${Y}>`;default:throw new Error(`${h}-component is not supported.`)}})(),se=Math.floor(32/t.bits),ne=Math.floor(se/8),te=()=>{let F="";for(let V=0;V<ne;V++){let Se=V*t.bits*4,Ve=Se+t.bits;F+=`
          // reuse a data (pass ${V})
            var input_offset${V>0?V:""} = ${V===0?N.indicesToOffset(`${N.type.indices}(batch, row, word_offset)`):"input_offset"};
            var a_data${V>0?V:""}: ${P};
            for (var j${V>0?V:""}: u32 = 0; j${V>0?V:""} < ${8/h}; j${V>0?V:""}++) {
              a_data${V>0?V:""}[j${V>0?V:""}] = ${N.getByOffset(`input_offset${V>0?V:""}`)};
              input_offset${V>0?V:""}++;
            }
          `;for(let ze=0;ze<_*v;ze++)F+=`
            b_value = ${g===1?`b${ze}_data`:`b${ze}_data[i]`};
            ${t.bits===2?`{
              let half_word = b_value >> ${V*16}u;
              let byte_lo = half_word & 0xFFu;
              let byte_hi = (half_word >> 8u) & 0xFFu;
              let spread_word = (byte_lo & 0xFu) | ((byte_lo >> 4u) << 8u) | ((byte_hi & 0xFu) << 16u) | ((byte_hi >> 4u) << 24u);
              b_value_lower = unpack4xU8(spread_word & b_mask);
              b_value_upper = unpack4xU8((spread_word >> 2u) & b_mask);
            }`:`b_value_lower = unpack4xU8((b_value >> ${Se}u) & b_mask);
            b_value_upper = unpack4xU8((b_value >> ${Ve}u) & b_mask);`}
            b_quantized_values = ${P}(${Array.from({length:4},(Ie,ke)=>`${Y}(b_value_lower[${ke}]), ${Y}(b_value_upper[${ke}])`).join(", ")});
            b_dequantized_values = ${h===1?`${P}(${Array.from({length:8},(Ie,ke)=>`(b_quantized_values[${ke}] - ${J?`zero_point${ze}`:"zero_point"}) * scale${ze}`).join(", ")});`:`(b_quantized_values - ${P}(${Array(8).fill(`${J?`zero_point${ze}`:"zero_point"}`).join(",")})) * scale${ze};`};
            workgroup_shared[local_id.x * ${v} + ${Math.floor(ze/_)}]${_>1?`[${ze%_}]`:""} += ${Array.from({length:8/h},(Ie,ke)=>`${h===1?`a_data${V>0?V:""}[${ke}] * b_dequantized_values[${ke}]`:`dot(a_data${V>0?V:""}[${ke}], b_dequantized_values[${ke}])`}`).join(" + ")};
          `}return F},U=()=>{let F=`
            var col_index = col * ${_};
            ${J?`
            let zero_point_values_per_byte: u32 = ${Math.floor(8/t.bits)}u;
            let zero_point_bytes_per_col = (nBlocksPerCol + zero_point_values_per_byte - 1u) / zero_point_values_per_byte;
            var zero_point_byte_count: u32;
            var zero_point_word_index: u32;
            var zero_point_byte_offset: u32;
            let zero_point_sub_offset: u32 = block % zero_point_values_per_byte;
            var zero_point_bits_offset: u32;
            var zero_point_word: u32;`:`
            // The default zero point is ${Math.pow(2,t.bits-1)} for unsigned ${t.bits}-bit quantization.
            let zero_point = ${Y}(${Math.pow(2,t.bits-1).toFixed(1)});`}
            `;for(let V=0;V<_*v;V++)F+=`
            let scale${V} = ${X.getByOffset("col_index * nBlocksPerCol + block")};
            ${J?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block / zero_point_values_per_byte);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_sub_offset * ${t.bits}u);
            zero_point_word = ${J.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${V} = ${Y}((zero_point_word) & ${t.bits===2?"0x3u":"0xFu"});`:""}
            col_index += 1;`;return F},H=()=>{let F=`col_index = col * ${_};`;for(let V=0;V<_*v;V++)F+=`
            let b${V}_data = ${L.getByIndices(`${L.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return F+=`
            var b_value: u32;
            let b_mask: u32 = ${t.bits===2?"0x03030303u":"0x0F0F0F0Fu"};
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${P};
            var b_dequantized_values: ${P};`,F};return`
        var<workgroup> workgroup_shared: array<${W.type.value}, ${v*$}>;
        ${A.declareVariables(...Q,W)}
        ${A.mainStart([$,1,1])}
          let output_indices = ${W.offsetToIndices(`(global_idx / ${$}) * ${v}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += ${$}) {
            //process one block
            var word_offset: u32 = block * ${t.blockSize/h};
            ${U()}
            for (var word: u32 = 0; word < ${p}; word += ${g}) {
              ${H()}
              for (var i: u32 = 0; i < ${g}; i++) {
                ${te()}
                word_offset += ${se/h};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${v}) {
            var output_value: ${W.type.value} = ${W.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < ${$}u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${v};
            }
            ${W.setByIndices(`${W.type.indices}(batch, row, col + local_id.x)`,"output_value")};
          }
        }`};return{name:"MatMulNBits",shaderCache:{hint:`${t.blockSize};${t.bits};${h};${g};${_};${v};${$}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:y,dataType:c}],dispatchGroup:{x:S},programUniforms:w}),getShaderSource:C}},sd=(e,t)=>{let r=e[0].dims,i=r.length,n=r[i-2],a=t.k,s=t.n,u=r.slice(0,i-2),l=R.size(u),p=e[1].dims[2]/4,c=e[0].dataType,h=ve(t.k),g=ve(p),_=u.concat([n,s]),y=128,v=s%8===0?8:s%4===0?4:1,S=y/v,$=Math.floor(32/t.bits),w=S*g*$,T=w/h,k=w/t.blockSize,I=R.size(_)/v,C=[],A=[l,n,a/h],x=R.convertShape(e[1].dims).slice();x.splice(-1,1,p/g),C.push(...Z(A)),C.push(...Z(x)),C.push(...Z(e[2].dims)),e.length===4&&C.push(...Z(R.convertShape(e[3].dims)));let N=[l,n,s];C.push(...Z(N));let L=X=>{let Q=A.length,J=M("a",e[0].dataType,Q,h),O=M("b",12,x.length,g),W=M("scales",e[2].dataType,e[2].dims.length),Y=[J,O,W],P=e.length===4?M("zero_points",12,e[3].dims.length):void 0;P&&Y.push(P);let se=N.length,ne=j("output",e[0].dataType,se),te=Ce(e[0].dataType),U=()=>{switch(h){case 1:return`
          let a_data0 = vec4<${te}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${te}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${te}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${te}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw new Error(`${h}-component is not supported.`)}};return`
        var<workgroup> sub_a: array<${J.type.value}, ${T}>;
        var<workgroup> inter_results: array<array<${ne.type.value}, ${S}>, ${v}>;
        ${X.declareVariables(...Y,ne)}
        ${X.mainStart([S,v,1])}
          let output_indices = ${ne.offsetToIndices(`workgroup_index * ${v}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let n_blocks_per_col = uniforms.b_shape[1];
          let num_tiles =  (n_blocks_per_col - 1) / ${k} + 1;

          // Loop over shared dimension.
          for (var tile: u32 = 0; tile < num_tiles; tile += 1) {
            let a_col_start = tile * ${T};
            // load one tile A data into shared memory.
            for (var a_offset = local_idx; a_offset < ${T}; a_offset += ${y})
            {
              let a_col = a_col_start + a_offset;
              if (a_col < uniforms.a_shape[2])
              {
                sub_a[a_offset] = ${J.getByIndices(`${J.type.indices}(batch, row, a_col)`)};
              } else {
                sub_a[a_offset] = ${J.type.value}(0);
              }
            }
            workgroupBarrier();

            // each thread process one block
            let b_row = col + local_id.y;
            let block = tile * ${k} + local_id.x;
            ${P?`
            let zero_point_values_per_byte: u32 = ${Math.floor(8/t.bits)}u;
            let zero_point_bytes_per_col = (n_blocks_per_col + zero_point_values_per_byte - 1u) / zero_point_values_per_byte;
            let zero_point_byte_count = b_row * zero_point_bytes_per_col + (block / zero_point_values_per_byte);
            let zero_point_word_index = zero_point_byte_count >> 0x2u;
            let zero_point_byte_offset = zero_point_byte_count & 0x3u;
            let zero_point_sub_offset: u32 = block % zero_point_values_per_byte;
            let zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_sub_offset * ${t.bits}u);
            let zero_point_word = ${P.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point = ${te}((zero_point_word) & ${t.bits===2?"0x3u":"0xFu"});`:`
            // The default zero point is ${Math.pow(2,t.bits-1)} for unsigned ${t.bits}-bit quantization.
            let zero_point = ${te}(${Math.pow(2,t.bits-1).toFixed(1)});`}
            let scale = ${W.getByOffset("b_row * n_blocks_per_col + block")};
            let b_data = ${O.getByIndices(`${O.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${t.blockSize/h};
            for (var i: u32 = 0; i < ${g}; i++) {
              let b_value = ${g===1?"b_data":"b_data[i]"};
              ${(()=>{let H=Math.floor($/8),F="";for(let V=0;V<H;V++){let Se=V*t.bits*4,Ve=Se+t.bits;F+=`
              ${U()}
              {${t.bits===2?`
                let half_word = b_value >> ${V*16}u;
                let byte_lo = half_word & 0xFFu;
                let byte_hi = (half_word >> 8u) & 0xFFu;
                let spread_word = (byte_lo & 0xFu) | ((byte_lo >> 4u) << 8u) | ((byte_hi & 0xFu) << 16u) | ((byte_hi >> 4u) << 24u);
                let b_value_lower = unpack4xU8(spread_word & 0x03030303u);
                let b_value_upper = unpack4xU8((spread_word >> 2u) & 0x03030303u);`:`
                let b_value_lower = unpack4xU8((b_value >> ${Se}u) & 0x0F0F0F0Fu);
                let b_value_upper = unpack4xU8((b_value >> ${Ve}u) & 0x0F0F0F0Fu);`}
                let b_quantized_values = mat2x4<${te}>(${Array.from({length:4},(ze,Ie)=>`${te}(b_value_lower[${Ie}]), ${te}(b_value_upper[${Ie}])`).join(", ")});
                let b_dequantized_values = (b_quantized_values - mat2x4<${te}>(${Array(8).fill("zero_point").join(",")})) * scale;
                inter_results[local_id.y][local_id.x] += ${Array.from({length:2},(ze,Ie)=>`${`dot(a_data${Ie}, b_dequantized_values[${Ie}])`}`).join(" + ")};
              }
              word_offset += ${8/h};`}return F})()}
            }
            workgroupBarrier();
          }

          if (local_idx < ${v}) {
            var output_value: ${ne.type.value} = ${ne.type.value}(0);
            for (var b = 0u; b < ${S}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${ne.setByIndices(`${ne.type.indices}(batch, row, col + local_idx)`,"output_value")}
            }
          }
        }`};return{name:"BlockwiseMatMulNBits32",shaderCache:{hint:`${t.blockSize};${h};${g};${S};${v}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:_,dataType:c}],dispatchGroup:{x:I},programUniforms:C}),getShaderSource:L}},ah=(e,t)=>{nd(e.inputs,t),t.blockSize===32&&e.adapterInfo.isVendor("intel")&&e.adapterInfo.isArchitecture("gen-12lp")?e.compute(sd(e.inputs,t)):e.compute(ad(e.inputs,t))},sh=e=>he(e)}),od,ud,ld,dd,pd,cd,fd,hd,oh,hy=D(()=>{"use strict";ee(),re(),ie(),od=e=>{if(!e||e.length<1)throw new Error("Too few inputs");if(e[0].dataType!==1&&e[0].dataType!==10)throw new Error("Input type must be float or float16.");if(e.length>=2){let t=e[0].dims.length*2===e[1].dims[0];if(e.length===4&&(t=e[3].dims[0]*2===e[1].dims[0]),!t)throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}},ud=(e,t,r)=>{let i="";for(let n=t-1;n>=0;--n)i+=`
            k = i32(${e.indicesGet("indices",n)}) - ${K("uniforms.pads",n,r)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${K("uniforms.x_shape",n,t)})) {
              break;
            }
            offset += k * i32(${K("uniforms.x_strides",n,t)});
        `;return`
          value = ${e.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${i}
            value = x[offset];
          }
      `},ld=(e,t,r)=>{let i="";for(let n=t-1;n>=0;--n)i+=`
                k = i32(${e.indicesGet("indices",n)}) - ${K("uniforms.pads",n,r)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${K("uniforms.x_shape",n,t)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${K("uniforms.x_shape",n,t)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${K("uniforms.x_strides",n,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${i}
              value = x[offset];
          `},dd=(e,t,r)=>{let i="";for(let n=t-1;n>=0;--n)i+=`
                k = i32(${e.indicesGet("indices",n)}) - ${K("uniforms.pads",n,r)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${K("uniforms.x_shape",n,t)})) {
                  k = i32(${K("uniforms.x_shape",n,t)}) - 1;
                }
                offset += k * i32(${K("uniforms.x_strides",n,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${i}
              value = x[offset];
          `},pd=(e,t,r)=>{let i="";for(let n=t-1;n>=0;--n)i+=`
                k = i32(${e.indicesGet("indices",n)}) - ${K("uniforms.pads",n,r)};
                if (k < 0)  {
                  k += i32(${K("uniforms.x_shape",n,t)}]);
                }
                if (k >= i32(${K("uniforms.x_shape",n,t)})) {
                  k -= i32(${K("uniforms.x_shape",n,t)});
                }
                offset += k * i32(${K("uniforms.x_strides",n,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${i}
              value = x[offset];
          `},cd=(e,t,r)=>{switch(r.mode){case 0:return ud(e,t,r.pads.length);case 1:return ld(e,t,r.pads.length);case 2:return dd(e,t,r.pads.length);case 3:return pd(e,t,r.pads.length);default:throw new Error("Invalid mode")}},fd=(e,t)=>{let r=R.padShape(e[0].dims.slice(),t.pads),i=e[0].dims,n=R.size(r),a=[{type:12,data:n},{type:6,data:t.pads}],s=e.length>=3&&e[2].data;t.mode===0&&a.push({type:s?e[2].dataType:1,data:t.value}),a.push(...Z(e[0].dims,r));let u=["rank"],l=p=>{let c=j("output",e[0].dataType,r.length),h=M("x",e[0].dataType,i.length),g=h.type.value,_=cd(c,i.length,t),y=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:t.pads.length}];return t.mode===0&&y.push({name:"constant_value",type:s?g:"f32"}),`
            ${p.registerUniforms(y).declareVariables(h,c)}
            ${p.mainStart()}
            ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${c.offsetToIndices("global_idx")};

            var value = ${g}(0);
            ${_}
            output[global_idx] = value;
        }`};return{name:"Pad",shaderCache:{hint:`${t.mode}${s}`,inputDependencies:u},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(R.size(r)/64)},programUniforms:a}),getShaderSource:l}},hd=(e,t)=>{if(e.length>1){let r=e[1].getBigInt64Array(),i=e.length>=3&&e[2].data?e[2].dataType===10?e[2].getUint16Array()[0]:e[2].getFloat32Array()[0]:0,n=e[0].dims.length,a=new Int32Array(2*n).fill(0);if(e.length>=4){let u=e[3].getBigInt64Array();for(let l=0;l<u.length;l++)a[Number(u[l])]=Number(r[l]),a[Number(u[l])+n]=Number(r[l+u.length])}else r.forEach((u,l)=>a[Number(l)]=Number(u));let s=[];return a.forEach(u=>s.push(u)),{mode:t.mode,value:i,pads:s}}else return t},oh=(e,t)=>{od(e.inputs);let r=hd(e.inputs,t);e.compute(fd(e.inputs,r),{inputs:[0]})}}),or,gn,yn,_n,wn,md,gd,$n,bn,uh,lh,vn,dh,ph,xn,ch,fh,hh,mh,my=D(()=>{"use strict";Pe(),ee(),re(),ie(),or=e=>{if(_e.webgpu.validateInputContent&&(!e||e.length!==1))throw new Error("Pool ops requires 1 input.")},gn=(e,t,r)=>{let i=t.format==="NHWC",n=e.dims.slice();i&&n.splice(1,0,n.pop());let a=Object.hasOwnProperty.call(t,"dilations"),s=t.kernelShape.slice(),u=t.strides.slice(),l=a?t.dilations.slice():[],p=t.pads.slice();Yr.adjustPoolAttributes(r,n,s,u,l,p);let c=Yr.computePoolOutputShape(r,n,u,l,s,p,t.autoPad,t.ceilMode),h=Object.assign({},t);a?Object.assign(h,{kernelShape:s,strides:u,pads:p,dilations:l,cacheKey:t.cacheKey}):Object.assign(h,{kernelShape:s,strides:u,pads:p,cacheKey:t.cacheKey});let g=c.slice();return g.push(g.splice(1,1)[0]),[h,i?g:c]},yn=(e,t)=>{let r=t.format==="NHWC",i=R.size(e),n=R.size(t.kernelShape),a=[{type:12,data:i},{type:12,data:n}],s=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(t.kernelShape.length<=2){let u=t.kernelShape[t.kernelShape.length-1],l=t.strides[t.strides.length-1],p=t.pads[t.pads.length/2-1],c=t.pads[t.pads.length-1],h=!!(p+c);a.push({type:12,data:u},{type:12,data:l},{type:12,data:p},{type:12,data:c}),s.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let g=!1;if(t.kernelShape.length===2){let _=t.kernelShape[t.kernelShape.length-2],y=t.strides[t.strides.length-2],v=t.pads[t.pads.length/2-2],S=t.pads[t.pads.length-2];g=!!(v+S),a.push({type:12,data:_},{type:12,data:y},{type:12,data:v},{type:12,data:S}),s.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[a,s,!0,h,g]}else{if(r)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let u=R.computeStrides(t.kernelShape);a.push({type:12,data:u},{type:12,data:t.pads},{type:12,data:t.strides}),s.push({name:"kernelStrides",type:"u32",length:u.length},{name:"pads",type:"u32",length:t.pads.length},{name:"strides",type:"u32",length:t.strides.length});let l=t.pads.reduce((p,c)=>p+c);return[a,s,!!l,!1,!1]}},_n=(e,t,r,i,n,a,s,u,l,p,c,h)=>{let g=n.format==="NHWC",_=t.type.value,y=j("output",t.type.tensor,i);if(n.kernelShape.length<=2){let v="",S="",$="",w=r-(g?2:1);if(c?v=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${w}] = indices[${w}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${w}] < 0 || xIndices[${w}]
                      >= uniforms.x_shape[${w}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${a}
                }`:v=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${w}] = indices[${w}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${a}
                }`,n.kernelShape.length===2){let T=r-(g?3:2);h?S=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${T}] = indices[${T}] * uniforms.sh - uniforms.phStart + j;
                  if (xIndices[${T}] < 0 || xIndices[${T}] >= uniforms.x_shape[${T}]) {
                    pad += i32(uniforms.kw);
                    continue;
                  }
              `:S=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${T}] = indices[${T}] * uniforms.sh - uniforms.phStart + j;
                `,$=`
              }
            `}return`
            ${e.registerUniforms(l).declareVariables(t,y)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

              let indices = ${y.offsetToIndices("global_idx")};
              var xIndices = ${y.offsetToIndices("global_idx")};

              var value = ${_}(${u});
              var pad = 0;
              ${S}
              ${v}
              ${$}
              ${s}

              output[global_idx] = value;
            }`}else{if(g)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let v=n.kernelShape.length,S=n.pads.length,$="";return p?$=`
                if (xIndices[j] >= uniforms.x_shape[j]) {
                  pad++;
                  isPad = true;
                  break;
                }
              }
              if (!isPad) {
                let x_val = x[${t.indicesToOffset("xIndices")}];
                ${a}
              }`:$=`
              }
              let x_val = x[${t.indicesToOffset("xIndices")}];
              ${a}
            `,`
            ${e.registerUniforms(l).declareVariables(t,y)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
              let indices = ${y.offsetToIndices("global_idx")};
              var xIndices = ${y.offsetToIndices("global_idx")};

              var offsets: array<u32, ${v}>;

              var value = ${_}(${u});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${v-1}u; j++) {
                  offsets[j] = offset / ${K("uniforms.kernelStrides","j",v)};
                  offset -= offsets[j] * ${K("uniforms.kernelStrides","j",v)};
                }
                offsets[${v-1}] = offset;

                isPad = false;
                for (var j = ${r-v}u; j < ${r}u; j++) {
                  xIndices[j] = indices[j] * ${K("uniforms.strides",`j - ${r-v}u`,v)}
                    + offsets[j - ${r-v}u] - ${K("uniforms.pads","j - 2u",S)};
                  ${$}
              }
              ${s}

              output[global_idx] = value;
            }`}},wn=e=>`${e.format};${e.ceilMode};${e.autoPad};${e.kernelShape.length}`,md=e=>`${wn(e)};${e.countIncludePad}`,gd=e=>`${wn(e)};${e.storageOrder};${e.dilations}`,$n=e=>({format:e.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],ceilMode:e.ceil_mode,kernelShape:e.kernel_shape,strides:e.strides,pads:e.pads}),bn=(e,t,r,i)=>{let[n,a]=gn(t,i,r),s=M("x",t.dataType,t.dims.length),u=s.type.value,l="value += x_val;",p="";n.countIncludePad?p+=`value /= ${u}(uniforms.kernelSize);`:p+=`value /= ${u}(i32(uniforms.kernelSize) - pad);`;let[c,h,g,_,y]=yn(a,n);c.push(...Z(t.dims,a));let v=["rank"];return{name:e,shaderCache:{hint:`${i.cacheKey};${g};${_};${y}`,inputDependencies:v},getRunData:()=>({outputs:[{dims:a,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(R.size(a)/64)},programUniforms:c}),getShaderSource:S=>_n(S,s,t.dims.length,a.length,n,l,p,0,h,g,_,y)}},uh=e=>{let t=e.count_include_pad!==0,r=$n(e);if(r.ceilMode!==0)throw new Error("ceil_mode output-shape is computed, but ceil_mode kernel execution (padding/divisor) is not yet implemented in the WebGPU AveragePool kernel");let i={countIncludePad:t,...r,cacheKey:""};return{...i,cacheKey:md(i)}},lh=(e,t)=>{or(e.inputs),e.compute(bn("AveragePool",e.inputs[0],!1,t))},vn={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},dh=e=>{let t=e.format;return{format:t,...vn,cacheKey:t}},ph=(e,t)=>{or(e.inputs),e.compute(bn("GlobalAveragePool",e.inputs[0],!0,t))},xn=(e,t,r,i)=>{let[n,a]=gn(t,i,r),s=`
      value = max(x_val, value);
    `,u="",l=M("x",t.dataType,t.dims.length),p=["rank"],[c,h,g,_,y]=yn(a,n);return c.push(...Z(t.dims,a)),{name:e,shaderCache:{hint:`${i.cacheKey};${g};${_};${y}`,inputDependencies:p},getRunData:()=>({outputs:[{dims:a,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(R.size(a)/64)},programUniforms:c}),getShaderSource:v=>_n(v,l,t.dims.length,a.length,n,s,u,t.dataType===10?-65504:-1e5,h,g,_,y)}},ch=(e,t)=>{or(e.inputs),e.compute(xn("MaxPool",e.inputs[0],!1,t))},fh=e=>{let t=e.storage_order,r=e.dilations,i=$n(e);if(t!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(i.ceilMode!==0)throw new Error("ceil_mode output-shape is computed, but ceil_mode kernel execution (padding) is not yet implemented in the WebGPU MaxPool kernel");let n={storageOrder:t,dilations:r,...i,cacheKey:""};return{...n,cacheKey:gd(n)}},hh=e=>{let t=e.format;return{format:t,...vn,cacheKey:t}},mh=(e,t)=>{or(e.inputs),e.compute(xn("GlobalMaxPool",e.inputs[0],!0,t))}}),yd,_d,gh,yh,gy=D(()=>{"use strict";ee(),re(),xe(),ie(),yd=(e,t)=>{if(e.length<2||e.length>3)throw new Error("DequantizeLinear requires 2 or 3 inputs.");if(e.length===3&&e[1].dims===e[2].dims)throw new Error("x-scale and x-zero-point must have the same shape.");if(e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==0&&e[1].dims.length!==1&&e[1].dims.length!==e[0].dims.length)throw new Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(e.length>2){if(e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==e[2].dims.length)throw new Error("scale and zero-point inputs must have the same rank.");if(!e[1].dims.map((r,i)=>r===e[2].dims[i]).reduce((r,i)=>r&&i,!0))throw new Error("scale and zero-point inputs must have the same shape.")}if(t.blockSize>0){if(e[1].dims.length===0||e[1].dims.length===1&&e[1].dims[0]===1)throw new Error("blockSize must be set only for block quantization.");if(!e[1].dims.map((n,a)=>a===t.axis||n===e[0].dims[a]).reduce((n,a)=>n&&a,!0))throw new Error("For block qunatization, scale input shape to match the input shape except for the axis");if(e[1].dims.length!==e[0].dims.length)throw new Error("For block qunatization the scale input rank must be the same as the x rank.");let r=e[0].dims[t.axis],i=e[1].dims[t.axis];if(t.blockSize<Math.ceil(r/i)||t.blockSize>Math.ceil(r/(i-1)-1))throw new Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}},_d=(e,t)=>{let r=R.normalizeAxis(t.axis,e[0].dims.length),i=e[0].dataType,n=i===3,a=e[0].dims,s=e[1].dataType,u=R.size(a),l=i===3||i===2,p=l?[Math.ceil(R.size(e[0].dims)/4)]:e[0].dims,c=e[1].dims,h=e.length>2?e[2]:void 0,g=h?l?[Math.ceil(R.size(h.dims)/4)]:h.dims:void 0,_=c.length===0||c.length===1&&c[0]===1,y=_===!1&&c.length===1,v=ve(u),S=_&&(!l||v===4),$=S?v:1,w=S&&!l?v:1,T=M("input",l?12:i,p.length,w),k=M("scale",s,c.length),I=h?M("zero_point",l?12:i,g.length):void 0,C=j("output",s,a.length,$),A=[T,k];I&&A.push(I);let x=[p,c];h&&x.push(g);let N=[{type:12,data:u/$},{type:12,data:r},{type:12,data:t.blockSize},...Z(...x,a)],L=X=>{let Q=[{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}];return`
      ${X.registerUniforms(Q).declareVariables(...A,C)}
      ${X.mainStart()}
          ${X.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${C.offsetToIndices("global_idx")};

          // Set input x
          ${l?`
            let input = ${T.getByOffset("global_idx / 4")};
            let x_vec = ${n?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${$===1?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${T.getByOffset("global_idx")};`};

          // Set scale input
          ${_?`let scale_value= ${k.getByOffset("0")}`:y?`
            let scale_index = ${C.indicesGet("output_indices","uniforms.axis")};
            let scale_value= ${k.getByOffset("scale_index")};`:`
            var scale_indices: ${k.type.indices} = output_indices;
            let index = ${k.indicesGet("scale_indices","uniforms.axis")} / uniforms.block_size;
            ${k.indicesSet("scale_indices","uniforms.axis","index")};
            let scale_value= ${k.getByIndices("scale_indices")};`};

          // Set zero-point input
          ${I?_?l?`
                let zero_point_input = ${I.getByOffset("0")};
                let zero_point_vec =  ${n?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${I.getByOffset("0")}`:y?l?`
                let zero_point_index = ${C.indicesGet("output_indices","uniforms.axis")};
                let zero_point_input = ${I.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${n?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`:`
                let zero_point_index = ${C.indicesGet("output_indices","uniforms.axis")};
                let zero_point_value = ${I.getByOffset("zero_point_index")};`:l?`
                let zero_point_offset = ${k.indicesToOffset("scale_indices")};
                let zero_point_input = ${I.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${n?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${I.getByIndices("scale_indices")};`:`let zero_point_value = ${l?n?"i32":"u32":T.type.value}(0);`};
      // Compute and write output
      ${C.setByOffset("global_idx",`${C.type.value}(x_value - zero_point_value) * scale_value`)};
      }`};return{name:"DequantizeLinear",shaderCache:{hint:t.cacheKey,inputDependencies:I?["rank","rank","rank"]:["rank","rank"]},getShaderSource:L,getRunData:()=>({outputs:[{dims:a,dataType:s}],dispatchGroup:{x:Math.ceil(u/$/64),y:1,z:1},programUniforms:N})}},gh=(e,t)=>{yd(e.inputs,t),e.compute(_d(e.inputs,t))},yh=e=>he({axis:e.axis,blockSize:e.blockSize})}),wd,$d,_h,yy=D(()=>{"use strict";Pe(),ee(),ie(),wd=(e,t,r)=>{let i=e===t,n=e<t&&r<0,a=e>t&&r>0;if(i||n||a)throw new Error("Range these inputs' contents are invalid.")},$d=(e,t,r,i)=>{let n=Math.abs(Math.ceil((t-e)/r)),a=[n],s=n,u=[{type:12,data:s},{type:i,data:e},{type:i,data:r},...Z(a)],l=p=>{let c=j("output",i,a.length),h=c.type.value,g=[{name:"outputSize",type:"u32"},{name:"start",type:h},{name:"delta",type:h}];return`
        ${p.registerUniforms(g).declareVariables(c)}
        ${p.mainStart()}
        ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${h}(global_idx) * uniforms.delta;
      }`};return{name:"Range",shaderCache:{hint:`${i}`},getShaderSource:l,getRunData:()=>({outputs:[{dims:a,dataType:i}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:u})}},_h=e=>{let t=0,r=0,i=0;e.inputs[0].dataType===6?(t=e.inputs[0].getInt32Array()[0],r=e.inputs[1].getInt32Array()[0],i=e.inputs[2].getInt32Array()[0]):e.inputs[0].dataType===1&&(t=e.inputs[0].getFloat32Array()[0],r=e.inputs[1].getFloat32Array()[0],i=e.inputs[2].getFloat32Array()[0]),_e.webgpu.validateInputContent&&wd(t,r,i),e.compute($d(t,r,i,e.inputs[0].dataType),{inputs:[]})}}),bd,vd,wh,$h,_y=D(()=>{"use strict";ee(),re(),xe(),ie(),bd=(e,t,r,i)=>{if(e!=="none"&&i!=="i32"&&i!=="u32"&&i!=="f32")throw new Error(`Input ${i} is not supported with reduction ${e}.`);let n=`{
                var oldValue = 0;
                loop {
                  let newValueF32 =`,a=`;
                  let newValue = bitcast<i32>(newValueF32);
                  let res = atomicCompareExchangeWeak(&${t}, oldValue, newValue);
                  if res.exchanged {
                    break;
                  }
                  oldValue = res.old_value;
                }
              }`;switch(e){case"none":return`${t}=${r};`;case"add":return i==="i32"||i==="u32"?`atomicAdd(&${t}, bitcast<${i}>(${r}));`:`
              ${n}bitcast<${i}>(oldValue) + (${r})${a}`;case"max":return i==="i32"||i==="u32"?`atomicMax(&${t}, bitcast<${i}>(${r}));`:`
                ${n}max(bitcast<f32>(oldValue), (${r}))${a}`;case"min":return i==="i32"||i==="u32"?`atomicMin(&${t}, bitcast<${i}>(${r}));`:`${n}min(bitcast<${i}>(oldValue), (${r}))${a}`;case"mul":return`${n}(bitcast<${i}>(oldValue) * (${r}))${a}`;default:throw new Error(`Reduction ${e} is not supported.`)}},vd=(e,t)=>{let r=e[0].dims,i=e[1].dims,n=r,a=1,s=Math.ceil(R.sizeToDimension(i,i.length-1)/a),u=i[i.length-1],l=R.sizeFromDimension(r,u),p=[{type:12,data:s},{type:12,data:u},{type:12,data:l},...Z(e[1].dims,e[2].dims,n)],c=h=>{let g=M("indices",e[1].dataType,e[1].dims.length),_=M("updates",e[2].dataType,e[2].dims.length,a),y=t.reduction!=="none"&&t.reduction!==""?Gp("output",e[0].dataType,n.length):j("output",e[0].dataType,n.length,a);return`
      ${h.registerUniform("output_size","u32").registerUniform("last_index_dimension","u32").registerUniform("num_updates_elements","u32").declareVariables(g,_,y)}
      ${h.mainStart()}
        ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
  var data_offset = 0u;
  let indices_start = uniforms.last_index_dimension * global_idx;
  let indices_end = indices_start + uniforms.last_index_dimension;
  for (var i = indices_start; i < indices_end; i++) {
    var index = i32(indices[i].x);
    ${e[0].dims.length===1?`
    let element_count_dim = uniforms.output_strides;
    let dim_value = uniforms.output_shape;`:`
    let element_count_dim = uniforms.output_strides[i - indices_start];
    let dim_value = uniforms.output_shape[i - indices_start];`}
    if (index >= 0) {
      if (index >= i32(dim_value)) {
        index = i32(dim_value - 1);
      }
    } else {
      if (index < -i32(dim_value)) {
        index = 0;
      } else {
        index += i32(dim_value);
      }
    }
    data_offset += u32((u32(index) * element_count_dim));
  }

  for (var i = 0u; i < uniforms.num_updates_elements; i++) {
    let value = updates[uniforms.num_updates_elements * global_idx + i];
    ${bd(t.reduction,"output[data_offset + i]","value",y.type.value)}
  }

      }`};return{name:"ScatterND",shaderCache:{hint:`${t.cacheKey}_${t.reduction}`,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:p}),getShaderSource:c}},wh=e=>he({reduction:e.reduction}),$h=(e,t)=>{e.compute(vd(e.inputs,t),{inputs:[e.inputs[1],e.inputs[2]],outputs:[]})}}),xd,Sd,kd,Sn,Td,Id,Ed,Cd,zd,Ad,Od,Rd,kn,Bd,Md,Nd,Dd,Ud,bh,vh,wy=D(()=>{"use strict";ee(),re(),xe(),ie(),xd=(e,t)=>{if(e.every(r=>r>0||(()=>{throw new Error("Resize requires scales input values to be positive")})),e.length>0){if(t.mode==="linear"){if(!(e.length===2||e.length===3||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1||e.length===5&&e[0]===1&&e[1]===1))throw new Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if(t.mode==="cubic"&&!(e.length===2||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1))throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode")}},Sd=(e,t,r)=>{t.every(n=>n>=0&&n<r||(()=>{throw new Error("Resize requires axes input values to be positive and less than rank")}));let i=new Array(r).fill(1);return t.forEach((n,a)=>i[n]=e[a]),i},kd=(e,t,r,i,n,a)=>{let[s,u,l]=r>10?[1,2,3]:[-1,e.length>1?1:-1,-1],p=e[0].dims.length;if(s>0&&e.length>s&&e[s].dims.length>0)e[s].getFloat32Array().forEach(c=>a.push(c));else if(t.coordinateTransformMode==="tf_crop_and_resize")throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(u>0&&e.length>u&&e[u].dims.length===1&&e[u].dims[0]>0){if(e[u].getFloat32Array().forEach(c=>i.push(c)),i.length!==0&&i.length!==p&&r>=18&&i.length!==t.axes.length)throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");xd(i,t),t.axes.length>0&&Sd(i,t.axes,p).forEach((c,h)=>i[h]=c)}if(l>0&&e.length>l&&e[l].dims.length===1&&e[l].dims[0]>0&&(e[l].getBigInt64Array().forEach(c=>n.push(Number(c))),n.length!==0&&n.length!==p&&r>=18&&n.length!==t.axes.length))throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(t.axes.length>0){if(i.length!==0&&i.length!==t.axes.length)throw new Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(n.length!==0&&n.length!==t.axes.length)throw new Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if(typeof i<"u"&&typeof n<"u"&&i.length>0&&n.length>p)throw new Error("Resize requires only of scales or sizes to be specified")},Sn=(e,t,r,i)=>`
  // The whole part and the fractional part are calculated separately due to inaccuracy of floating
  // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
  // offset-by-one error later in floor().
  let big = (${e}) * (${t});
  let whole = ${i}(big / (${r}));
  let fract = ${i}(big % (${r})) / ${i}(${r});
  return whole + fract;
`,Td=(e,t)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${t} { `+(()=>{switch(e){case"asymmetric":return`
          if (xScale < 1.0 || floor(xScale) != xScale) {
            return ${t}(xResized) / ${t}(xScale);
          } else {
            ${Sn("xResized","lengthOriginal","lengthResized",t)}
          }
        `;case"pytorch_half_pixel":return`if (lengthResized > 1) {
                    return (${t}(xResized) + 0.5) / ${t}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`;case"tf_half_pixel_for_nn":return`return (${t}(xResized) + 0.5) / ${t}(xScale);`;case"align_corners":return`if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    ${Sn("xResized","lengthOriginal - 1","lengthResized - 1",t)}
                  }`;case"tf_crop_and_resize":return`if (lengthResized > 1) {
                    return ${t}(roiStart) * ${t}(lengthOriginal - 1) +
                        (${t}(xResized) * ${t}(roiEnd - roiStart) * ${t}(lengthOriginal - 1)) /
                        ${t}(lengthResized - 1);
                  } else {
                    return 0.5 * ${t}(roiStart + roiEnd) * ${t}(lengthOriginal - 1);
                  }`;case"half_pixel_symmetric":return`const outputWidth = ${t}xScale * ${t}(lengthResized);
                  const adjustment = ${t}(lengthResized) / outputWidth;
                  const center = ${t}(lengthOriginal) / 2;
                  const offset = center * (1 - adjustment);
                  return offset + ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;case"half_pixel":return`return ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;default:throw new Error(`Coordinate transform mode ${e} is not supported`)}})()+"}",Id=(e,t,r)=>`fn getNearestPixelFromOriginal(xOriginal: ${r}, isDownSample: bool) -> ${r} {`+(()=>{switch(e){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";default:if(t<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw new Error(`Nearest mode ${e} is not supported`)}})()+"}",Ed=(e,t,r)=>{let i=new Array(r).fill(0).concat(new Array(r).fill(1)),n=e.length===0?i:e.slice();return t.length>0?(t.forEach((a,s)=>{i[a]=n[s],i[s+r]=n[t.length+s]}),i):n},Cd=(e,t,r,i)=>{let n=[];if(r.length>0)if(i.length>0){if(e.forEach(a=>n.push(a)),Math.max(...i)>e.length)throw new Error("axes is out of bound");i.forEach((a,s)=>n[a]=r[s])}else r.forEach(a=>n.push(a));else{if(t.length===0)throw new Error("Resize requires either scales or sizes.");n=e.map((a,s)=>Math.round(a*t[s]))}return n},zd=(e,t,r)=>{let i=(()=>{switch(r.keepAspectRatioPolicy){case"not_larger":return r.axes.length>0?Math.min(...r.axes.map(a=>t[a]),Number.MAX_VALUE):Math.min(...t,Number.MAX_VALUE);case"not_smaller":return r.axes.length>0?Math.max(...r.axes.map(a=>t[a]),Number.MIN_VALUE):Math.max(...t,Number.MIN_VALUE);default:throw new Error(`Keep aspect ratio policy ${r.keepAspectRatioPolicy} is not supported`)}})();t.fill(1,0,t.length);let n=e.slice();return r.axes.length>0?(r.axes.forEach(a=>t[a]=i),r.axes.forEach(a=>n[a]=Math.round(e[a]*t[a]))):(t.fill(i,0,t.length),n.forEach((a,s)=>n[s]=Math.round(a*t[s]))),n},Ad=(e,t,r,i,n)=>`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${e.type.indices}) -> array<${e.type.value}, ${r.length}> {
      var original_indices: array<${e.type.value}, ${r.length}>;
      for (var i:u32 = 0; i < ${r.length}; i++) {
        var output_index = ${e.indicesGet("output_indices","i")};
        var scale = ${K("uniforms.scales","i",i)};
        var roi_low = ${K("uniforms.roi","i",n)};
        var roi_hi = ${K("uniforms.roi",`i + ${t.length}`,n)};
        if (scale == 1.0) {
          original_indices[i] = ${e.type.value}(output_index);
        } else {
          var input_shape_i = ${K("uniforms.input_shape","i",t.length)};
          var output_shape_i = ${K("uniforms.output_shape","i",r.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`,Od=(e,t,r,i,n,a,s)=>`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
      var input_indices: ${e.type.indices};
      for (var i:u32 = 0; i < ${i.length}; i++) {
        var output_index = ${t.indicesGet("output_indices","i")};
        var input_index: u32;
        var scale = ${K("uniforms.scales","i",n)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${K("uniforms.roi","i",a)};
          var roi_hi = ${K("uniforms.roi",`i + ${r.length}`,a)};
          var input_shape_i = ${K("uniforms.input_shape","i",r.length)};
          var output_shape_i = ${K("uniforms.output_shape","i",i.length)};
          var original_idx = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                        input_shape_i, roi_low, roi_hi);
          if (!${s} || (original_idx >= 0 && original_idx < ${t.type.value}(input_shape_i))) {
            if (original_idx < 0) {
              input_index = 0;
            } else if (original_idx > ${t.type.value}(input_shape_i - 1)) {
              input_index = input_shape_i - 1;
            } else {
              input_index = u32(getNearestPixelFromOriginal(original_idx, scale < 1));
            }
          } else {
            input_index = u32(original_idx);
          }
        }
        ${e.indicesSet("input_indices","i","input_index")}
      }
      return input_indices;
    }`,Rd=(e,t)=>`
    fn checkInputIndices(input_indices: ${e.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var input_index = ${e.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${K("uniforms.input_shape","i",t.length)}) {
          return false;
        }
      }
      return true;
    }`,kn=(e,t,r,i)=>e.rank>i?`
    ${e.indicesSet("input_indices",t,"channel")};
    ${e.indicesSet("input_indices",r,"batch")};
`:"",Bd=(e,t,r,i,n)=>{let[a,s,u,l]=r.length===2?[-1,0,1,-1]:[0,2,3,1],p=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${p} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",s,`max(0, min(row, ${r[s]} - 1))`)};
      ${e.indicesSet("input_indices",u,`max(0, min(col, ${r[u]} - 1))`)};
      ${kn(e,l,a,2)}
      return ${e.getByIndices("input_indices")};
    }

    fn bilinearInterpolation(output_indices: ${t.type.indices}) -> ${p} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var row:${p} = originalIndices[${s}];
      var col:${p} = originalIndices[${u}];
      ${i?`if (row < 0 || row > (${r[s]} - 1) || col < 0 || col > (${r[u]} - 1)) {
        return ${n};
      }`:""};
      row = max(0, min(row, ${r[s]} - 1));
      col = max(0, min(col, ${r[u]} - 1));
      var row1: u32 = u32(row);
      var col1: u32 = u32(col);
      var row2: u32 = u32(row + 1);
      var col2: u32 = u32(col + 1);
      var channel: u32 = ${r.length>2?`u32(originalIndices[${l}])`:"0"};
      var batch: u32 =  ${r.length>2?`u32(originalIndices[${a}])`:"0"};
      var x11: ${p} = getInputValue(batch, channel, row1, col1);
      var x12: ${p} = getInputValue(batch, channel, row1, col2);
      var x21: ${p} = getInputValue(batch, channel, row2, col1);
      var x22: ${p} = getInputValue(batch, channel, row2, col2);
      var dx1: ${p} = abs(row - ${p}(row1));
      var dx2: ${p} = abs(${p}(row2) - row);
      var dy1: ${p} = abs(col - ${p}(col1));
      var dy2: ${p} = abs(${p}(col2) - col);
      if (row1 == row2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (col1 == col2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      return (x11 * dx2 * dy2 + x12 * dx2 * dy1 + x21 * dx1 * dy2 + x22 * dx1 * dy1);
    }`},Md=(e,t,r,i,n,a,s,u,l,p)=>{let c=r.length===2,h=!0,[g,_]=c?[0,1]:h?[2,3]:[1,2],y=e.type.value,v=S=>{let $=S===g?"row":"col";return`
      fn ${$}CubicInterpolation(input_indices: ${e.type.indices}, output_indices: ${t.type.indices}) -> ${y} {
        var output_index = ${t.indicesGet("output_indices",S)};
        var originalIdx: ${y} = getOriginalCoordinateFromResizedCoordinate(output_index, ${n[S]},
        ${i[S]}, ${r[S]}, ${a[S]}, ${a[S]} + ${r.length});
        var fractOriginalIdx: ${y} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${u} && (originalIdx < 0 || originalIdx > (${r[S]} - 1))) {
          return ${l};
        }
        var data: array<${y}, 4> = array<${y}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${$}: ${y} = originalIdx + ${y}(i);
          if (${$} < 0 || ${$} >= ${r[S]}) {
            ${p?`coefs[i + 1] = 0.0;
                        continue;`:u?`return ${l};`:`${$} = max(0, min(${$}, ${r[S]} - 1));`};
          }
        var input_indices_copy: ${e.type.indices} = input_indices;
          ${e.indicesSet("input_indices_copy",S,`u32(${$})`)};
          data[i + 1] = ${S===g?e.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
        }
        return cubicInterpolation1D(data, coefs);
      }`};return`
    ${v(g)};
    ${v(_)};
  fn getCubicInterpolationCoefs(s: ${y}) -> array<${y}, 4> {
    var absS = abs(s);
    var coeffs: array<${y}, 4> = array<${y}, 4>(0.0, 0.0, 0.0, 0.0);
    var oneMinusAbsS: ${y} = 1.0 - absS;
    var twoMinusAbsS: ${y} = 2.0 - absS;
    var onePlusAbsS: ${y} = 1.0 + absS;
    coeffs[0] = ((${s} * onePlusAbsS - 5 * ${s}) * onePlusAbsS + 8 * ${s}) * onePlusAbsS - 4 * ${s};
    coeffs[1] = ((${s} + 2) * absS - (${s} + 3)) * absS * absS + 1;
    coeffs[2] = ((${s} + 2) * oneMinusAbsS - (${s} + 3)) * oneMinusAbsS * oneMinusAbsS + 1;
    coeffs[3] = ((${s} * twoMinusAbsS - 5 * ${s}) * twoMinusAbsS + 8 * ${s}) * twoMinusAbsS - 4 * ${s};
    return coeffs;
  }

  fn cubicInterpolation1D(x: array<${y}, 4>, coefs: array<${y}, 4>) -> ${y} {
    var coefsSum: ${y} = coefs[0] + coefs[1] + coefs[2] + coefs[3];
    return (x[0] * coefs[0] + x[1] * coefs[1]+ x[2] * coefs[2]+ x[3] * coefs[3]) / coefsSum;
  }

  fn bicubicInterpolation(output_indices: ${t.type.indices}) -> ${y} {
    var input_indices: ${e.type.indices} = output_indices;
    return colCubicInterpolation(input_indices, output_indices);
  }
    `},Nd=(e,t,r,i,n)=>{let[a,s,u,l,p]=r.length===3?[-1,0,1,2,-1]:[0,2,3,4,1],c=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${c} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",s,`max(0, min(depth, ${r[s]} - 1))`)};
      ${e.indicesSet("input_indices",u,`max(0, min(height, ${r[u]} - 1))`)};
      ${e.indicesSet("input_indices",l,`max(0, min(width, ${r[l]} - 1))`)};
      ${kn(e,p,a,3)}
      return ${e.getByIndices("input_indices")};
    }

    fn trilinearInterpolation(output_indices: ${t.type.indices}) -> ${c} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${c} = originalIndices[${s}];
      var height:${c} = originalIndices[${u}];
      var width:${c} = originalIndices[${l}];
      ${i?`if (depth < 0 || depth > (${r[s]} - 1) || height < 0 || height > (${r[u]} - 1) || width < 0 || (width > ${r[l]} - 1)) {
      return ${n};
        }`:""};

    depth = max(0, min(depth, ${r[s]} - 1));
      height = max(0, min(height, ${r[u]} - 1));
      width = max(0, min(width, ${r[l]} - 1));
      var depth1: u32 = u32(depth);
      var height1: u32 = u32(height);
      var width1: u32 = u32(width);
      var depth2: u32 = u32(depth + 1);
      var height2: u32 = u32(height + 1);
      var width2: u32 = u32(width + 1);
      var channel: u32 = ${r.length>3?`u32(originalIndices[${p}])`:"0"};
      var batch: u32 =  ${r.length>3?`u32(originalIndices[${a}])`:"0"};

      var x111: ${c} = getInputValue(batch, channel, depth1, height1, width1);
      var x112: ${c} = getInputValue(batch, channel, depth1, height1, width2);
      var x121: ${c} = getInputValue(batch, channel, depth1, height2, width1);
      var x122: ${c} = getInputValue(batch, channel, depth1, height2, width2);
      var x211: ${c} = getInputValue(batch, channel, depth2, height1, width1);
      var x212: ${c} = getInputValue(batch, channel, depth2, height1, width2);
      var x221: ${c} = getInputValue(batch, channel, depth2, height2, width1);
      var x222: ${c} = getInputValue(batch, channel, depth2, height2, width2);
      var dx1: ${c} = abs(depth - ${c}(depth1));
      var dx2: ${c} = abs(${c}(depth2) - depth);
      var dy1: ${c} = abs(height - ${c}(height1));
      var dy2: ${c} = abs(${c}(height2) - height);
      var dz1: ${c} = abs(width - ${c}(width1));
      var dz2: ${c} = abs(${c}(width2) - width);
      if (depth1 == depth2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (height1 == height2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      if (width1 == width2) {
        dz1 = 0.5;
        dz2 = 0.5;
      }
      return (x111 * dx2 * dy2 * dz2 + x112 * dx2 * dy2 * dz1 + x121 * dx2 * dy1 *dz2 + x122 * dx2 * dy1 * dz1 +
              x211 * dx1 * dy2 * dz2 + x212 * dx1 * dy2 * dz1 + x221 * dx1 * dy1 *dz2 + x222 * dx1 * dy1 * dz1);
    }`},Dd=(e,t,r,i,n,a)=>{let s=e.dims,u=Ed(a,t.axes,s.length),l=Cd(s,i,n,t.axes),p=i.slice();i.length===0&&(p=s.map((w,T)=>w===0?1:l[T]/w),t.keepAspectRatioPolicy!=="stretch"&&(l=zd(s,p,t)));let c=j("output",e.dataType,l.length),h=M("input",e.dataType,s.length),g=R.size(l),_=s.length===l.length&&s.every((w,T)=>w===l[T]),y=t.coordinateTransformMode==="tf_crop_and_resize",v=t.extrapolationValue,S=h.type.value,$=w=>`
      ${_?"":`
      ${Td(t.coordinateTransformMode,S)};
      ${(()=>{switch(t.mode){case"nearest":return`
              ${Rd(h,s)};
              ${Id(t.nearestMode,r,S)};
              ${Od(h,c,s,l,p.length,u.length,y)};
              `;case"linear":return`
              ${Ad(c,s,l,p.length,u.length)};
              ${(()=>{if(s.length===2||s.length===4)return`${Bd(h,c,s,y,v)}`;if(s.length===3||s.length===5)return`${Nd(h,c,s,y,v)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(s.length===2||s.length===4)return`${Md(h,c,s,l,p,u,t.cubicCoeffA,y,t.extrapolationValue,t.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${w.registerUniform("output_size","u32").registerUniform("scales","f32",p.length).registerUniform("roi","f32",u.length).declareVariables(h,c)}
      ${w.mainStart()}
        ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${_?"output[global_idx] = input[global_idx];":`
        let output_indices = ${c.offsetToIndices("global_idx")};
        var input_indices: ${h.type.indices};
        ${(()=>{switch(t.mode){case"nearest":return`input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${h.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${t.extrapolationValue};
                }`;case"linear":return`output[global_idx] = ${s.length===2||s.length===4?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${t.mode}`)}})()};
`}
      }`;return{name:"Resize",shaderCache:{hint:`${t.cacheKey}|${r}|${p.length>0?t.mode==="cubic"?p:p.length:""}|${n.length>0?n:""}|${u.length>0?u:""}|${_}|${t.mode==="nearest"?s.length:s}`,inputDependencies:["rank"]},getShaderSource:$,getRunData:()=>({outputs:[{dims:l,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:[{type:12,data:g},{type:1,data:p},{type:1,data:u},...Z(s,l)]})}},Ud=e=>{let t=e.customDataBuffer;return new Uint32Array(t.buffer,t.byteOffset,1)[0]},bh=(e,t)=>{let r=[],i=[],n=[],a=Ud(e);if(t.antialias!==0)throw Error("Only default value (0) for Antialias attribute is supported");kd(e.inputs,t,a,r,i,n),e.compute(Dd(e.inputs[0],t,a,r,i,n),{inputs:[0]})},vh=e=>{let t=e.antialias,r=e.axes,i=e.coordinateTransformMode,n=e.cubicCoeffA,a=e.excludeOutside!==0,s=e.extrapolationValue,u=e.keepAspectRatioPolicy,l=e.mode,p=e.nearestMode===""?"simple":e.nearestMode;return he({antialias:t,axes:r,coordinateTransformMode:i,cubicCoeffA:n,excludeOutside:a,extrapolationValue:s,keepAspectRatioPolicy:u,mode:l,nearestMode:p})}}),Pd,Ld,xh,$y=D(()=>{"use strict";ee(),re(),ie(),Pd=e=>{if(!e||e.length<3)throw new Error("layerNorm requires at least 3 inputs.");let t=e[0],r=e[1],i=e[2];if(t.dataType!==r.dataType||t.dataType!==i.dataType)throw new Error("All inputs must have the same data type");if(t.dims.length!==3&&t.dims.length!==2)throw new Error("Input must be 2D or 3D");if(r.dims.length!==3&&r.dims.length!==2)throw new Error("Skip must be 2D or 3D");let n=t.dims[t.dims.length-1],a=t.dims[t.dims.length-2];if(r.dims[r.dims.length-1]!==n)throw new Error("Skip must have the same hidden size as input");if(r.dims[r.dims.length-2]!==a)throw new Error("Skip must have the same sequence length as input");if(i.dims.length!==1)throw new Error("Gamma must be 1D");if(i.dims[i.dims.length-1]!==n)throw new Error("Gamma must have the same hidden size as input");if(e.length>3){let s=e[3];if(s.dims.length!==1)throw new Error("Beta must be 1D");if(s.dims[s.dims.length-1]!==n)throw new Error("Beta must have the same hidden size as input")}if(e.length>4){let s=e[4];if(s.dims.length!==1)throw new Error("Bias must be 1D");if(s.dims[s.dims.length-1]!==n)throw new Error("Bias must have the same hidden size as input")}},Ld=(e,t,r,i)=>{let n=t.simplified,a=e[0].dims,s=R.size(a),u=a,l=s,p=a.slice(-1)[0],c=i?a.slice(0,-1).concat(1):[],h=!n&&e.length>3,g=e.length>4,_=i&&r>1,y=i&&r>2,v=r>3,S=64,$=ve(p),w=[{type:12,data:l},{type:12,data:$},{type:12,data:p},{type:1,data:t.epsilon}],T=I=>{let C=[{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}],A=[M("x",e[0].dataType,e[0].dims,$),M("skip",e[1].dataType,e[1].dims,$),M("gamma",e[2].dataType,e[2].dims,$)];h&&A.push(M("beta",e[3].dataType,e[3].dims,$)),g&&A.push(M("bias",e[4].dataType,e[4].dims,$)),A.push(j("output",e[0].dataType,u,$)),_&&A.push(j("mean_output",1,c)),y&&A.push(j("inv_std_output",1,c)),v&&A.push(j("input_skip_bias_sum",e[0].dataType,u,$));let x=Ce(e[0].dataType),N=Ce(1,$);return`

      ${I.registerUniforms(C).declareVariables(...A)}
      var<workgroup> sum_shared : array<${N}, ${S}>;
      var<workgroup> sum_squared_shared : array<${N}, ${S}>;

      ${I.mainStart([S,1,1])}
        let ix = local_id.x;
        let iy = global_id.x / ${S};

        let hidden_size_vectorized: u32 = uniforms.hidden_size / uniforms.components;
        var stride = hidden_size_vectorized / ${S};
        let offset = ix * stride + iy * hidden_size_vectorized;
        let offset1d = stride * ix;
        if (ix == ${S-1}) {
          stride = hidden_size_vectorized - stride * ix;
        }
        for (var i: u32 = 0; i < stride; i++) {
          let skip_value = skip[offset + i];
          let bias_value = ${g?"bias[offset1d + i]":x+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${v?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${Ft(x,$,"value")};
          sum_shared[ix] += f32_value;
          sum_squared_shared[ix] += f32_value * f32_value;
        }
        workgroupBarrier();

        var reduce_size : u32 = ${S};
        for (var curr_size = reduce_size >> 1;  curr_size > 0; curr_size = reduce_size >> 1) {
          reduce_size = curr_size + (reduce_size & 1);
          if (ix < curr_size) {
            sum_shared[ix] += sum_shared[ix + reduce_size];
            sum_squared_shared[ix] += sum_squared_shared[ix + reduce_size];
          }
          workgroupBarrier();
        }

        let sum = sum_shared[0];
        let square_sum = sum_squared_shared[0];
        let mean = ${wt("sum",$)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${wt("square_sum",$)} / f32(uniforms.hidden_size) ${n?"":"- mean * mean"} + uniforms.epsilon);
        ${_?"mean_output[global_idx] = mean;":""}
        ${y?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${n?"":`- ${x}(mean)`}) *
            ${x}(inv_std_dev) * gamma[offset1d + i]
            ${h?"+ beta[offset1d + i]":""};
        }
      }`},k=[{dims:u,dataType:e[0].dataType}];return r>1&&k.push({dims:c,dataType:1}),r>2&&k.push({dims:c,dataType:1}),r>3&&k.push({dims:a,dataType:e[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${$};${_};${y};${v}`,inputDependencies:e.map((I,C)=>"type")},getShaderSource:T,getRunData:()=>({outputs:k,dispatchGroup:{x:Math.ceil(l/p)},programUniforms:w})}},xh=(e,t)=>{Pd(e.inputs);let r=[0];e.outputCount>1&&r.push(-3),e.outputCount>2&&r.push(-3),e.outputCount>3&&r.push(3),e.compute(Ld(e.inputs,t,e.outputCount,!1),{outputs:r})}}),qd,ur,Wd,Tn,Vd,Gd,Sh,kh,by=D(()=>{"use strict";ee(),re(),xe(),ie(),qd=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");if(t.axes.length!==0){if(t.axes.length!==t.starts.length||t.axes.length!==t.ends.length)throw new Error("axes, starts and ends must have the same length")}else if(t.starts.length!==t.ends.length)throw new Error("starts and ends must have the same length");e.slice(1).forEach((r,i)=>{if(e[i+1].dataType!==6&&e[i+1].dataType!==7)throw new Error(`Input ${i} must be an array of int32 or int64`)})},ur=(e,t)=>{let r=[];if(e.length>t)if(e[t].dataType===7)e[t].getBigInt64Array().forEach(i=>r.push(Number(i)));else if(e[t].dataType===6)e[t].getInt32Array().forEach(i=>r.push(Number(i)));else throw new Error(`Input ${t} must be an array of int32 or int64`);return r},Wd=(e,t)=>{if(e.length>1){let r=ur(e,1),i=ur(e,2),n=ur(e,3);return n.length===0&&(n=[...Array(e[0].dims.length).keys()]),he({starts:r,ends:i,axes:n})}else return t},Tn=(e,t,r,i,n)=>{let a=e;return e<0&&(a+=r[i[t]]),n[t]<0?Math.max(0,Math.min(a,r[i[t]]-1)):Math.max(0,Math.min(a,r[i[t]]))},Vd=(e,t,r)=>`fn calculateInputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
          var input_indices: ${e.type.indices};
          var carry = 0u;
          for (var i = ${r.length-1}; i >= 0; i--) {
            let input_shape_i = ${K("uniforms.input_shape","i",r.length)};
            let steps_i = ${K("uniforms.steps","i",r.length)};
            let signs_i = ${K("uniforms.signs","i",r.length)};
            let starts_i = ${K("uniforms.starts","i",r.length)};
            var output_index = ${t.indicesGet("output_indices","i")};
            var input_index = output_index * steps_i + starts_i + carry;
            carry = input_index / input_shape_i;
            input_index = input_index % input_shape_i;
            if (signs_i < 0) {
              input_index = input_shape_i - input_index - 1u + starts_i;
            }
            ${e.indicesSet("input_indices","i","input_index")};
          }
          return input_indices;
      }`,Gd=(e,t)=>{let r=e[0].dims,i=R.size(r),n=t.axes.length>0?R.normalizeAxes(t.axes,r.length):[...Array(r.length).keys()],a=ur(e,4);a.forEach($=>$!==0||(()=>{throw new Error("step cannot be 0")})),a.length===0&&(a=Array(n.length).fill(1));let s=t.starts.map(($,w)=>Tn($,w,r,n,a)),u=t.ends.map(($,w)=>Tn($,w,r,n,a));if(n.length!==s.length||n.length!==u.length)throw new Error("start, ends and axes should have the same number of elements");if(n.length!==r.length)for(let $=0;$<r.length;++$)n.includes($)||(s.splice($,0,0),u.splice($,0,r[$]),a.splice($,0,1));let l=a.map($=>Math.sign($));a.forEach(($,w,T)=>{if($<0){let k=(u[w]-s[w])/$,I=s[w],C=I+k*a[w];s[w]=C,u[w]=I,T[w]=-$}});let p=r.slice(0);n.forEach(($,w)=>{p[$]=Math.ceil((u[$]-s[$])/a[$])});let c={dims:p,dataType:e[0].dataType},h=j("output",e[0].dataType,p.length),g=M("input",e[0].dataType,e[0].dims.length),_=R.size(p),y=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:s.length},{name:"signs",type:"i32",length:l.length},{name:"steps",type:"u32",length:a.length}],v=[{type:12,data:_},{type:12,data:s},{type:6,data:l},{type:12,data:a},...Z(e[0].dims,p)],S=$=>`
      ${$.registerUniforms(y).declareVariables(g,h)}
        ${Vd(g,h,r)}
        ${$.mainStart()}
          ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${h.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${h.setByOffset("global_idx",g.getByIndices("input_indices"))}
      }`;return{name:"Slice",shaderCache:{hint:`${l.length}_${s.length}_${a.length}`,inputDependencies:["rank"]},getShaderSource:S,getRunData:()=>({outputs:[c],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:v})}},Sh=(e,t)=>{qd(e.inputs,t);let r=Wd(e.inputs,t);e.compute(Gd(e.inputs,r),{inputs:[0]})},kh=e=>{let t=e.starts,r=e.ends,i=e.axes;return he({starts:t,ends:r,axes:i})}}),Hd,Fd,Th,Ih,vy=D(()=>{"use strict";ee(),re(),xe(),$t(),ie(),Hd=e=>{if(!e||e.length!==1)throw new Error("Softmax op requires 1 input.")},Fd=(e,t)=>{let r=e.inputs[0],i=r.dims,n=R.size(i),a=i.length,s=R.normalizeAxis(t.axis,a),u=s<i.length-1,l,p=[];u?(p=Array.from({length:a},(A,x)=>x),p[s]=a-1,p[a-1]=s,l=e.compute(Ue(r,p),{inputs:[r],outputs:[-1]})[0]):l=r;let c=l.dims,h=c[a-1],g=n/h,_=ve(h),y=h/_,v=64;g===1&&(v=256);let S=(A,x)=>x===4?`max(max(${A}.x, ${A}.y), max(${A}.z, ${A}.w))`:x===2?`max(${A}.x, ${A}.y)`:x===3?`max(max(${A}.x, ${A}.y), ${A}.z)`:A,$=M("x",l.dataType,l.dims,_),w=j("result",l.dataType,l.dims,_),T=$.type.value,k=Ce(l.dataType)==="f32"?`var threadMax = ${T}(-3.4028234663852886e+38f);`:`var threadMax = ${T}(-65504.0h);`,I=A=>`
      var<workgroup> rowMaxShared : ${T};
      var<workgroup> rowSumShared : ${T};
      var<workgroup> threadShared : array<${T}, ${v}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${T} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${T}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${A.registerUniform("packedCols","i32").declareVariables($,w)}
      ${A.mainStart(v)}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${v};
        let row = gindex / wg;
        let cols = uniforms.packedCols;
        let row_stride : i32 = uniforms.packedCols;

        // find the rows max
        ${k}
        for (var col = lindex; col < cols; col += wg) {
          let value = getValue(row, col, row_stride);
          threadMax = max(threadMax, value);
        }
        if (lindex < cols) {
          threadShared[lindex] = threadMax;
        }
        workgroupBarrier();

        var reduceSize = min(cols, wg);
        for (var currSize = reduceSize >> 1;  currSize > 0; currSize = reduceSize >> 1) {
          reduceSize = currSize + (reduceSize & 1);
          if (lindex < currSize) {
            threadShared[lindex] = max(threadShared[lindex], threadShared[lindex + reduceSize]);
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowMaxShared = ${T}(${S("threadShared[0]",_)});
        }
        workgroupBarrier();

        // find the rows sum
        var threadSum = ${T}(0.0);
        for (var col = lindex; col < cols; col += wg) {
          let subExp = exp(getValue(row, col, row_stride) - rowMaxShared);
          threadSum += subExp;
        }
        threadShared[lindex] = threadSum;
        workgroupBarrier();

        for (var currSize = wg >> 1;  currSize > 0; currSize = currSize >> 1) {
          if (lindex < currSize) {
            threadShared[lindex] = threadShared[lindex] + threadShared[lindex + currSize];
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowSumShared = ${T}(${wt("threadShared[0]",_)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          var value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          // max operation protects against NaN since all values should be >=0
          value = max(value, ${T}(0.0));
          setValue(row, col, row_stride, value);
        }
      }`,C=e.compute({name:"Softmax",shaderCache:{hint:`${_};${v}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:c,dataType:l.dataType}],dispatchGroup:{x:g},programUniforms:[{type:6,data:y}]}),getShaderSource:I},{inputs:[l],outputs:[u?-1:0]})[0];u&&e.compute(Ue(C,p),{inputs:[C]})},Th=(e,t)=>{Hd(e.inputs),Fd(e,t)},Ih=e=>he({axis:e.axis})}),In,jd,Kd,Zd,Eh,xy=D(()=>{"use strict";ee(),re(),ie(),In=e=>Array.from(e.getBigInt64Array(),Number),jd=e=>{if(!e||e.length!==2)throw new Error("Tile requires 2 inputs.");if(e[0].dataType!==1&&e[0].dataType!==10&&e[0].dataType!==6&&e[0].dataType!==12)throw new Error("Tile only support float, float16, int32, and uint32 data types");if(e[1].dataType!==7)throw new Error("Tile `repeats` input should be of int64 data type");if(e[1].dims.length!==1)throw new Error("Tile `repeats` input should be 1-D");if(In(e[1]).length!==e[0].dims.length)throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},Kd=(e,t)=>{let r=[];for(let i=0;i<e.length;++i)r.push(e[i]*t[i]);return r},Zd=(e,t)=>{let r=e[0].dims,i=t??In(e[1]),n=Kd(r,i),a=R.size(n),s=e[0].dataType,u=M("input",s,r.length),l=j("output",s,n.length),p=c=>`
      const inputShape = ${u.indices(...r)};
      ${c.registerUniform("output_size","u32").declareVariables(u,l)}
      ${c.mainStart()}
      ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let output_indices = ${l.offsetToIndices("global_idx")};
      var input_indices: ${u.type.indices};
      for (var i = 0; i < ${r.length}; i++) {
        let input_dim_i = ${u.indicesGet("uniforms.input_shape","i")};
        let input_dim_value = ${l.indicesGet("output_indices","i")}  % input_dim_i;

        ${u.indicesSet("input_indices","i","input_dim_value")}
      }
      ${l.setByOffset("global_idx",u.getByIndices("input_indices"))}
    }`;return{name:"Tile",shaderCache:{hint:`${i}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:[{type:12,data:a},...Z(e[0].dims,n)]}),getShaderSource:p}},Eh=e=>{jd(e.inputs),e.compute(Zd(e.inputs),{inputs:[0]})}}),Qd,Xd,Ch,Sy=D(()=>{"use strict";ee(),re(),ie(),Qd=(e,t,r,i,n)=>{let a=j("output_data",n,r.length,4),s=M("a_data",t[1].dataType,t[1].dims.length,4),u=M("b_data",t[2].dataType,t[2].dims.length,4),l=M("c_data",t[0].dataType,t[0].dims.length,4),p,c=(h,g,_)=>`select(${g}, ${h}, ${_})`;if(!i)p=a.setByOffset("global_idx",c(s.getByOffset("global_idx"),u.getByOffset("global_idx"),l.getByOffset("global_idx")));else{let h=(g,_,y="")=>{let v=`a_data[index_a${_}][component_a${_}]`,S=`b_data[index_b${_}][component_b${_}]`,$=`bool(c_data[index_c${_}] & (0xffu << (component_c${_} * 8)))`;return`
            let output_indices${_} = ${a.offsetToIndices(`global_idx * 4u + ${_}u`)};
            let offset_a${_} = ${s.broadcastedIndicesToOffset(`output_indices${_}`,a)};
            let offset_b${_} = ${u.broadcastedIndicesToOffset(`output_indices${_}`,a)};
            let offset_c${_} = ${l.broadcastedIndicesToOffset(`output_indices${_}`,a)};
            let index_a${_} = offset_a${_} / 4u;
            let index_b${_} = offset_b${_} / 4u;
            let index_c${_} = offset_c${_} / 4u;
            let component_a${_} = offset_a${_} % 4u;
            let component_b${_} = offset_b${_} % 4u;
            let component_c${_} = offset_c${_} % 4u;
            ${g}[${_}] = ${y}(${c(v,S,$)});
          `};n===9?p=`
            var data = vec4<u32>(0);
            ${h("data",0,"u32")}
            ${h("data",1,"u32")}
            ${h("data",2,"u32")}
            ${h("data",3,"u32")}
            output_data[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:p=`
            ${h("output_data[global_idx]",0)}
            ${h("output_data[global_idx]",1)}
            ${h("output_data[global_idx]",2)}
            ${h("output_data[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(l,s,u,a)}
        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${p}
      }`},Xd=e=>{let t=e[1].dims,r=e[2].dims,i=e[0].dims,n=e[1].dataType,a=!(R.areEqual(t,r)&&R.areEqual(r,i)),s=t,u=R.size(t);if(a){let p=jt.calcShape(jt.calcShape(t,r,!1),i,!1);if(!p)throw new Error("Can't perform where op on the given tensors");s=p,u=R.size(s)}let l=Math.ceil(u/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:p=>Qd(p,e,s,a,n),getRunData:()=>({outputs:[{dims:s,dataType:n}],dispatchGroup:{x:Math.ceil(u/64/4)},programUniforms:[{type:12,data:l},...Z(i,t,r,s)]})}},Ch=e=>{e.compute(Xd(e.inputs))}}),zh,ky=D(()=>{"use strict";U0(),pa(),P0(),L0(),q0(),W0(),V0(),K0(),Q0(),X0(),Y0(),J0(),ey(),ty(),ry(),iy(),ny(),ay(),sy(),oy(),uy(),ly(),dy(),py(),cy(),fy(),Zf(),hy(),my(),gy(),yy(),_y(),da(),wy(),eh(),$y(),by(),vy(),Yf(),xy(),$t(),ca(),Sy(),zh=new Map([["Abs",[wc]],["Acos",[$c]],["Acosh",[bc]],["Add",[rf]],["ArgMax",[mc,Un]],["ArgMin",[hc,Un]],["Asin",[vc]],["Asinh",[xc]],["Atan",[Sc]],["Atanh",[kc]],["Attention",[gc]],["AveragePool",[lh,uh]],["BatchNormalization",[yc]],["BiasAdd",[_c]],["BiasSplitGelu",[tf]],["Cast",[Ic,Tc]],["Ceil",[Cc]],["Clip",[Ec]],["Concat",[ff,hf]],["Conv",[Gn,Vn]],["ConvTranspose",[Sf,xf]],["Cos",[zc]],["Cosh",[Ac]],["CumSum",[kf,Tf]],["DepthToSpace",[If,Ef]],["DequantizeLinear",[gh,yh]],["DFT",[Cf,zf]],["Div",[nf]],["Einsum",[Af,Of]],["Elu",[Oc,hr]],["Equal",[af]],["Erf",[Rc]],["Exp",[Bc]],["Expand",[Rf]],["FastGelu",[Bf]],["Floor",[Mc]],["FusedConv",[Gn,Vn]],["Gather",[Nf,Mf]],["GatherElements",[Wf,qf]],["GatherBlockQuantized",[Pf,Lf]],["GatherND",[Df,Uf]],["Gelu",[Nc]],["Gemm",[Gf,Vf]],["GlobalAveragePool",[ph,dh]],["GlobalMaxPool",[mh,hh]],["Greater",[lf]],["GreaterOrEqual",[pf]],["GridSample",[Hf,Ff]],["GroupQueryAttention",[th]],["HardSigmoid",[Gc,Vc]],["HardSwish",[Hc]],["InstanceNormalization",[rh]],["LayerNormalization",[ih]],["LeakyRelu",[Dc,hr]],["Less",[df]],["LessOrEqual",[cf]],["Log",[Jc]],["MatMul",[nh]],["MatMulNBits",[ah,sh]],["MaxPool",[ch,fh]],["Mul",[sf]],["MultiHeadAttention",[Kf,jf]],["Neg",[Pc]],["Not",[Uc]],["Pad",[oh]],["Pow",[of]],["QuickGelu",[ef,hr]],["Range",[_h]],["Reciprocal",[Lc]],["ReduceMin",[lc]],["ReduceMean",[nc]],["ReduceMax",[uc]],["ReduceSum",[pc]],["ReduceProd",[dc]],["ReduceL1",[ac]],["ReduceL2",[sc]],["ReduceLogSum",[fc]],["ReduceLogSumExp",[oc]],["ReduceSumSquare",[cc]],["Relu",[qc]],["Resize",[bh,vh]],["RotaryEmbedding",[Jf]],["ScatterND",[$h,wh]],["Sigmoid",[Wc]],["Sin",[Fc]],["Sinh",[jc]],["Slice",[Sh,kh]],["SkipLayerNormalization",[xh]],["Split",[Qf,Xf]],["Sqrt",[Kc]],["Softmax",[Th,Ih]],["Sub",[uf]],["Tan",[Zc]],["Tanh",[Qc]],["ThresholdedRelu",[Yc,hr]],["Tile",[Eh]],["Transpose",[Fp,jp]],["Where",[Ch]]])}),Ah,Ty=D(()=>{"use strict";Pe(),dt(),ie(),Ah=class{constructor(e){this.backend=e,this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,t){this.repo.set(e,t)}run(e,t,r,i,n){We(e.programInfo.name);let a=this.backend.device,s=this.backend.getComputePassEncoder();this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2);let u=[];for(let p of t)u.push({binding:u.length,resource:{buffer:p.buffer}});for(let p of r)u.push({binding:u.length,resource:{buffer:p.buffer}});n&&u.push({binding:u.length,resource:n});let l=a.createBindGroup({layout:e.computePipeline.getBindGroupLayout(0),entries:u,label:e.programInfo.name});if(this.backend.sessionStatus==="capturing"){let p={kernelId:this.backend.currentKernelId,computePipeline:e.computePipeline,bindGroup:l,dispatchGroup:i};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(p)}s.setPipeline(e.computePipeline),s.setBindGroup(0,l),s.dispatchWorkgroups(...i),this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||this.backend.queryType==="at-passes")&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),De(e.programInfo.name)}dispose(){}build(e,t){We(e.name);let r=this.backend.device,i=[];[{feature:"shader-f16",extension:"f16"},{feature:"subgroups",extension:"subgroups"}].forEach(p=>{r.features.has(p.feature)&&i.push(`enable ${p.extension};`)});let n=Hp(t,this.backend.device.limits),a=e.getShaderSource(n),s=`${i.join(`
`)}
${n.additionalImplementations}
${a}`,u=r.createShaderModule({code:s,label:e.name});de("verbose",()=>`[WebGPU] ${e.name} shader code: ${s}`);let l=r.createComputePipeline({compute:{module:u,entryPoint:"main"},layout:"auto",label:e.name});return De(e.name),{programInfo:e,computePipeline:l,uniformVariablesInfo:n.variablesInfo}}normalizeDispatchGroupSize(e){let t=typeof e=="number"?e:e.x,r=typeof e=="number"?1:e.y||1,i=typeof e=="number"?1:e.z||1,n=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(t<=n&&r<=n&&i<=n)return[t,r,i];let a=t*r*i,s=Math.ceil(Math.sqrt(a));if(s>n){if(s=Math.ceil(Math.cbrt(a)),s>n)throw new Error("Total dispatch size exceeds WebGPU maximum.");return[s,s,s]}else return[s,s,1]}}}),Oh={};Zt(Oh,{WebGpuBackend:()=>Rh});var Yd,Jd,ep,Rh,Iy=D(()=>{"use strict";Pe(),ee(),dt(),Lp(),N0(),ky(),Ty(),Yd=(e,t)=>{if(t.length!==e.length)throw new Error(`inputDependencies length ${t.length} is not equal to inputTensors length ${e.length}.`);let r=[];for(let i=0;i<e.length;++i){let n=e[i].dataType;switch(t[i]){case"none":{r.push("");break}case"type":{r.push(`${n}`);break}case"rank":{let a=e[i].dims.length;r.push(`${n};${a}`);break}case"dims":{let a=e[i].dims.join(",");r.push(`${n};${a}`);break}default:throw new Error(`unsupported input dependency: ${t[i]}`)}}return r.join("|")},Jd=(e,t,r)=>{let i=e.name;return e.shaderCache?.hint&&(i+="["+e.shaderCache.hint+"]"),i+=":"+r+`:${Yd(t,e.shaderCache?.inputDependencies??new Array(t.length).fill("dims"))}`,i},ep=class{constructor(e){e&&(this.architecture=e.architecture,this.vendor=e.vendor)}isArchitecture(e){return this.architecture===e}isVendor(e){return this.vendor===e}},Rh=class{constructor(){this.currentSessionId=null,this.currentKernelId=null,this.commandEncoder=null,this.computePassEncoder=null,this.maxDispatchNumber=16,this.pendingDispatchNumber=0,this.pendingKernels=[],this.pendingQueries=new Map,this.sessionStatus="default",this.capturedCommandList=new Map,this.capturedPendingKernels=new Map,this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(this.currentKernelId===null)throw new Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let e=this.kernelCustomData.get(this.currentKernelId);return e||(e={},this.kernelCustomData.set(this.currentKernelId,e)),e}async initialize(e,t){this.env=e;let r=[],i={requiredLimits:{maxComputeWorkgroupStorageSize:t.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:t.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:t.limits.maxStorageBufferBindingSize,maxBufferSize:t.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:t.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:t.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:t.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:t.limits.maxComputeWorkgroupSizeZ},requiredFeatures:r},n=u=>t.features.has(u)&&r.push(u)&&!0;n("chromium-experimental-timestamp-query-inside-passes")||n("timestamp-query"),n("shader-f16"),n("subgroups"),this.device=await t.requestDevice(i);let a=t,s=t.info??(typeof a.requestAdapterInfo=="function"?await a.requestAdapterInfo():void 0);this.adapterInfo=new ep(s),this.gpuDataManager=Vp(this),this.programManager=new Ah(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,sa(e.logLevel,!!e.debug),this.device.onuncapturederror=u=>{u.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${u.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!0}),Object.defineProperty(this.env.webgpu,"adapter",{value:t,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){typeof this.querySet<"u"&&this.querySet.destroy(),this.gpuDataManager.dispose(),this.device&&this.env?.webgpu&&this.device.lost.then(()=>{delete this.env.webgpu.device})}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let e=this.getCommandEncoder(),t={};this.queryType==="at-passes"&&(t.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:this.pendingDispatchNumber*2,endOfPassWriteIndex:this.pendingDispatchNumber*2+1}),this.computePassEncoder=e.beginComputePass(t)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){if(!this.commandEncoder)return;We(),this.endComputePass();let e;this.queryType!=="none"&&(this.commandEncoder.resolveQuerySet(this.querySet,0,this.pendingDispatchNumber*2,this.queryResolveBuffer,0),e=this.device.createBuffer({size:this.pendingDispatchNumber*2*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(e,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,e,0,this.pendingDispatchNumber*2*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,this.queryType!=="none"&&e.mapAsync(GPUMapMode.READ).then(()=>{let t=new BigUint64Array(e.getMappedRange()),r=this.pendingQueries.get(e);for(let i=0;i<t.length/2;i++){let n=r[i],a=n.kernelId,s=this.kernels.get(a),u=s.kernelType,l=s.kernelName,p=n.programName,c=n.inputTensorViews,h=n.outputTensorViews,g=t[i*2],_=t[i*2+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=g);let y=Number(g-this.queryTimeBase),v=Number(_-this.queryTimeBase);if(!Number.isSafeInteger(y)||!Number.isSafeInteger(v))throw new RangeError("incorrect timestamp range");if(this.env.webgpu.profiling?.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:c.map(S=>({dims:S.dims,dataType:lt(S.dataType)})),outputsMetadata:h.map(S=>({dims:S.dims,dataType:lt(S.dataType)})),kernelId:a,kernelType:u,kernelName:l,programName:p,startTime:y,endTime:v});else{let S="";c.forEach((w,T)=>{S+=`input[${T}]: [${w.dims}] | ${lt(w.dataType)}, `});let $="";h.forEach((w,T)=>{$+=`output[${T}]: [${w.dims}] | ${lt(w.dataType)}, `}),console.log(`[profiling] kernel "${a}|${u}|${l}|${p}" ${S}${$}start time: ${y} ns, execution time: ${v-y} ns`)}Kr("GPU",`${p}::${g}::${_}`)}e.unmap(),this.pendingQueries.delete(e)}),De()}run(e,t,r,i,n,a){We(e.name);let s=[];for(let w=0;w<t.length;++w){let T=t[w].data;if(T===0)continue;let k=this.gpuDataManager.get(T);if(!k)throw new Error(`no GPU data for input: ${T}`);s.push(k)}let{outputs:u,dispatchGroup:l,programUniforms:p}=e.getRunData(t),c=r.length===0?u.map((w,T)=>T):r;if(c.length!==u.length)throw new Error(`Output size ${c.length} must be equal to ${u.length}.`);let h=[],g=[];for(let w=0;w<u.length;++w){if(!Number.isInteger(c[w])||c[w]<-3||c[w]>=a)throw new Error(`Invalid output index: ${c[w]}`);if(c[w]===-3)continue;let T=c[w]===-1,k=c[w]===-2,I=T||k?n(u[w].dataType,u[w].dims):i(c[w],u[w].dataType,u[w].dims);if(h.push(I),I.data===0)continue;let C=this.gpuDataManager.get(I.data);if(!C)throw new Error(`no GPU data for output: ${I.data}`);if(T&&this.temporaryData.push(C),k){let A=this.kernelPersistentData.get(this.currentKernelId);A||(A=[],this.kernelPersistentData.set(this.currentKernelId,A)),A.push(C)}g.push(C)}if(s.length!==t.length||g.length!==h.length){if(g.length===0)return De(e.name),h;throw new Error(`Program ${e.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}let _;if(p){let w=0,T=[];p.forEach(A=>{let x=typeof A.data=="number"?[A.data]:A.data;if(x.length===0)return;let N=A.type===10?2:4,L,X;A.type===10?(X=x.length>4?16:x.length>2?8:x.length*N,L=x.length>4?16:N*x.length):(X=x.length<=2?x.length*N:16,L=16),w=Math.ceil(w/X)*X,T.push(w);let Q=A.type===10?8:4;w+=x.length>4?Math.ceil(x.length/Q)*L:x.length*N});let k=16;w=Math.ceil(w/k)*k;let I=new ArrayBuffer(w);p.forEach((A,x)=>{let N=T[x],L=typeof A.data=="number"?[A.data]:A.data;if(A.type===6)new Int32Array(I,N,L.length).set(L);else if(A.type===12)new Uint32Array(I,N,L.length).set(L);else if(A.type===10)new Uint16Array(I,N,L.length).set(L);else if(A.type===1)new Float32Array(I,N,L.length).set(L);else throw new Error(`Unsupported uniform type: ${lt(A.type)}`)});let C=this.gpuDataManager.create(w,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(C.buffer,0,I,0,w),this.gpuDataManager.release(C.id),_={offset:0,size:w,buffer:C.buffer}}let y=this.programManager.normalizeDispatchGroupSize(l),v=y[1]===1&&y[2]===1,S=Jd(e,t,v),$=this.programManager.getArtifact(S);if($||($=this.programManager.build(e,y),this.programManager.setArtifact(S,$),de("info",()=>`[artifact] key: ${S}, programName: ${e.name}`)),p&&$.uniformVariablesInfo){if(p.length!==$.uniformVariablesInfo.length)throw new Error(`Uniform variables count mismatch: expect ${$.uniformVariablesInfo.length}, got ${p.length} in program "${$.programInfo.name}".`);for(let w=0;w<p.length;w++){let T=p[w],k=T.type,I=typeof T.data=="number"?1:T.data.length,[C,A]=$.uniformVariablesInfo[w];if(k!==C||I!==A)throw new Error(`Uniform variable ${w} mismatch: expect type ${C} with size ${A}, got type ${k} with size ${I} in program "${$.programInfo.name}".`)}}if(de("info",()=>`[ProgramManager] run "${e.name}" (key=${S}) with ${y[0]}x${y[1]}x${y[2]}`),this.queryType!=="none"||this.sessionStatus==="capturing"){let w={kernelId:this.currentKernelId,programName:$.programInfo.name,inputTensorViews:t,outputTensorViews:h};this.pendingKernels.push(w),this.sessionStatus==="capturing"&&this.capturedPendingKernels.get(this.currentSessionId).push(w)}return this.programManager.run($,s,g,y,_),De(e.name),h}upload(e,t){this.gpuDataManager.upload(e,t)}memcpy(e,t){this.gpuDataManager.memcpy(e,t)}async download(e,t){await this.gpuDataManager.download(e,t)}alloc(e){return this.gpuDataManager.create(e).id}free(e){return this.gpuDataManager.release(e)}createKernel(e,t,r,i){let n=zh.get(e);if(!n)throw new Error(`kernel not implemented: ${e}`);let a={kernelType:e,kernelName:i,kernelEntry:n[0],attributes:[n[1],r]};this.kernels.set(t,a)}releaseKernel(e){let t=this.kernelPersistentData.get(e);if(t){for(let r of t)this.gpuDataManager.release(r.id);this.kernelPersistentData.delete(e)}this.kernelCustomData.delete(e),this.kernels.delete(e)}computeKernel(e,t,r){let i=this.kernels.get(e);if(!i)throw new Error(`kernel not created: ${e}`);let n=i.kernelType,a=i.kernelName,s=i.kernelEntry,u=i.attributes;if(this.currentKernelId!==null)throw new Error(`kernel "[${n}] ${a}" is not allowed to be called recursively`);this.currentKernelId=e,u[0]&&(u[1]=u[0](u[1]),u[0]=void 0),de("info",()=>`[WebGPU] Start to run kernel "[${n}] ${a}"...`);let l=this.env.debug;this.temporaryData=[];try{return l&&this.device.pushErrorScope("validation"),s(t,u[1]),0}catch(p){return r.push(Promise.resolve(`[WebGPU] Kernel "[${n}] ${a}" failed. ${p}`)),1}finally{l&&r.push(this.device.popErrorScope().then(p=>p?`GPU validation error for kernel "[${n}] ${a}": ${p.message}`:null));for(let p of this.temporaryData)this.gpuDataManager.release(p.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(e,t,r,i){let n=this.sessionExternalDataMapping.get(e);n||(n=new Map,this.sessionExternalDataMapping.set(e,n));let a=n.get(t),s=this.gpuDataManager.registerExternalBuffer(r,i,a);return n.set(t,[s,r]),s}unregisterBuffers(e){let t=this.sessionExternalDataMapping.get(e);t&&(t.forEach(r=>this.gpuDataManager.unregisterExternalBuffer(r[0])),this.sessionExternalDataMapping.delete(e))}getBuffer(e){let t=this.gpuDataManager.get(e);if(!t)throw new Error(`no GPU data for buffer: ${e}`);return t.buffer}createDownloader(e,t,r){return async()=>{let i=await Mn(this,e,t);return oa(i.buffer,r)}}writeTimestamp(e){this.queryType==="inside-passes"&&this.computePassEncoder.writeTimestamp(this.querySet,e)}setQueryType(){this.queryType="none",(this.env.webgpu.profiling?.mode==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),this.queryType!=="none"&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:this.maxDispatchNumber*2}),this.queryResolveBuffer=this.device.createBuffer({size:this.maxDispatchNumber*2*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){de("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){de("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){de("info","replay"),this.sessionStatus="replaying";let e=this.capturedCommandList.get(this.currentSessionId),t=this.capturedPendingKernels.get(this.currentSessionId),r=e.length;this.pendingKernels=[];for(let i=0;i<r;i++){let n=this.getComputePassEncoder(),a=e[i];this.writeTimestamp(this.pendingDispatchNumber*2),n.setPipeline(a.computePipeline),n.setBindGroup(0,a.bindGroup),n.dispatchWorkgroups(...a.dispatchGroup),this.writeTimestamp(this.pendingDispatchNumber*2+1),this.pendingDispatchNumber++,this.queryType!=="none"&&this.pendingKernels.push(t[i]),(this.pendingDispatchNumber>=this.maxDispatchNumber||this.queryType==="at-passes")&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onCreateSession(){this.gpuDataManager.onCreateSession()}onReleaseSession(e){this.unregisterBuffers(e),this.capturedCommandList.has(e)&&this.capturedCommandList.delete(e),this.capturedPendingKernels.has(e)&&this.capturedPendingKernels.delete(e),this.gpuDataManager.onReleaseSession(e)}onRunStart(e){this.currentSessionId=e,this.setQueryType()}}}),Bh={};Zt(Bh,{init:()=>Mh});var Wr,tp,Mh,Ey=D(()=>{"use strict";ee(),dt(),re(),M0(),Wr=class Nh{constructor(t,r,i,n){this.module=t,this.dataType=r,this.data=i,this.dims=n}getFloat32Array(){if(this.dataType!==1)throw new Error("Invalid data type");let t=R.size(this.dims);return t===0?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,t)}getBigInt64Array(){if(this.dataType!==7)throw new Error("Invalid data type");let t=R.size(this.dims);return t===0?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,t)}getInt32Array(){if(this.dataType!==6)throw new Error("Invalid data type");let t=R.size(this.dims);return t===0?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,t)}getUint16Array(){if(this.dataType!==10&&this.dataType!==4)throw new Error("Invalid data type");let t=R.size(this.dims);return t===0?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,t)}reshape(t){if(R.size(t)!==R.size(this.dims))throw new Error("Invalid new shape");return new Nh(this.module,this.dataType,this.data,t)}},tp=class{constructor(e,t,r){this.module=e,this.backend=t,this.customDataOffset=0,this.customDataSize=0,this.adapterInfo=t.adapterInfo,this.deviceLimits=t.device.limits;let i=e.PTR_SIZE,n=r/e.PTR_SIZE,a=i===4?"i32":"i64";this.opKernelContext=Number(e.getValue(i*n++,a));let s=Number(e.getValue(i*n++,a));this.outputCount=Number(e.getValue(i*n++,a)),this.customDataOffset=Number(e.getValue(i*n++,"*")),this.customDataSize=Number(e.getValue(i*n++,a));let u=[];for(let l=0;l<s;l++){let p=Number(e.getValue(i*n++,a)),c=Number(e.getValue(i*n++,"*")),h=Number(e.getValue(i*n++,a)),g=[];for(let _=0;_<h;_++)g.push(Number(e.getValue(i*n++,a)));u.push(new Wr(e,p,c,g))}this.inputs=u}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}compute(e,t){let r=t?.inputs?.map(s=>typeof s=="number"?this.inputs[s]:s)??this.inputs,i=t?.outputs??[],n=(s,u,l)=>new Wr(this.module,u,this.output(s,l),l),a=(s,u)=>{let l=Ot(s,u);if(!l)throw new Error(`Unsupported data type: ${s}`);let p=l>0?this.backend.gpuDataManager.create(l).id:0;return new Wr(this.module,s,p,u)};return this.backend.run(e,r,i,n,a,this.outputCount)}output(e,t){let r=this.module.stackSave();try{let i=this.module.PTR_SIZE,n=i===4?"i32":"i64",a=this.module.stackAlloc((1+t.length)*i);this.module.setValue(a,t.length,n);for(let s=0;s<t.length;s++)this.module.setValue(a+i*(s+1),t[s],n);return this.module._JsepOutput(this.opKernelContext,e,a)}catch(i){throw new Error(`Failed to generate kernel's output[${e}] with dims [${t}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${i}`)}finally{this.module.stackRestore(r)}}},Mh=async(e,t,r,i)=>{let n=t.jsepInit;if(!n)throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if(e==="webgpu"){let a=(Iy(),yr(Oh)).WebGpuBackend,s=new a;await s.initialize(r,i),n("webgpu",[s,u=>s.alloc(Number(u)),u=>s.free(u),(u,l,p,c=!1)=>{if(c)de("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${Number(u)}, dst=${Number(l)}, size=${Number(p)}`),s.memcpy(Number(u),Number(l));else{de("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(u)}, gpuDataId=${Number(l)}, size=${Number(p)}`);let h=t.HEAPU8.subarray(Number(u>>>0),Number(u>>>0)+Number(p));s.upload(Number(l),h)}},async(u,l,p)=>{de("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${u}, dataOffset=${l}, size=${p}`),await s.download(Number(u),()=>t.HEAPU8.subarray(Number(l)>>>0,Number(l+p)>>>0))},(u,l,p)=>s.createKernel(u,Number(l),p,t.UTF8ToString(t._JsepGetNodeName(Number(l)))),u=>s.releaseKernel(u),(u,l,p,c)=>{de("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${p}, kernel=${u}, contextDataOffset=${l}`);let h=new tp(t,s,Number(l));return s.computeKernel(Number(u),h,c)},()=>s.captureBegin(),()=>s.captureEnd(),()=>s.replay()])}else{let a=new Wp(r);n("webnn",[a,()=>a.reserveTensorId(),s=>a.releaseTensorId(s),async(s,u,l,p,c)=>a.ensureTensor(s,u,l,p,c),(s,u)=>{a.uploadTensor(s,u)},async(s,u)=>a.downloadTensor(s,u),(s,u)=>a.registerMLContext(s,u),!!r.trace])}}}),rp,_a,wa,yt,ip,En,ri,$a,ba,lr,np,It,Dh,Uh,Cn,va,xa,Sa,Ph=D(()=>{"use strict";Pe(),O0(),R0(),ee(),Ut(),ra(),aa(),rp=(e,t)=>{me()._OrtInit(e,t)!==0&&fe("Can't initialize onnxruntime.")},_a=async e=>{rp(e.wasm.numThreads,Xr(e.logLevel))},wa=async(e,t)=>{me().asyncInit?.();let r=e.webgpu.adapter;if(t==="webgpu"){if(typeof navigator>"u"||!navigator.gpu)throw new Error("WebGPU is not supported in current environment");if(r){if(typeof r.limits!="object"||typeof r.features!="object"||typeof r.requestDevice!="function")throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let i=e.webgpu.powerPreference;if(i!==void 0&&i!=="low-power"&&i!=="high-performance")throw new Error(`Invalid powerPreference setting: "${i}"`);let n=e.webgpu.forceFallbackAdapter;if(n!==void 0&&typeof n!="boolean")throw new Error(`Invalid forceFallbackAdapter setting: "${n}"`);if(r=await navigator.gpu.requestAdapter({powerPreference:i,forceFallbackAdapter:n}),!r)throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}}if(t==="webnn"&&(typeof navigator>"u"||!navigator.ml))throw new Error("WebNN is not supported in current environment");{let i=(Ey(),yr(Bh)).init;t==="webgpu"&&await i("webgpu",me(),e,r),t==="webnn"&&await i("webnn",me(),e)}},yt=new Map,ip=e=>{let t=me(),r=t.stackSave();try{let i=t.PTR_SIZE,n=t.stackAlloc(2*i);t._OrtGetInputOutputCount(e,n,n+i)!==0&&fe("Can't get session input/output count.");let a=i===4?"i32":"i64";return[Number(t.getValue(n,a)),Number(t.getValue(n+i,a))]}finally{t.stackRestore(r)}},En=(e,t)=>{let r=me(),i=r.stackSave(),n=0;try{let a=r.PTR_SIZE,s=r.stackAlloc(2*a);r._OrtGetInputOutputMetadata(e,t,s,s+a)!==0&&fe("Can't get session input/output metadata.");let u=Number(r.getValue(s,"*"));n=Number(r.getValue(s+a,"*"));let l=r.HEAP32[n/4];if(l===0)return[u,0];let p=r.HEAPU32[n/4+1],c=[];for(let h=0;h<p;h++){let g=Number(r.getValue(n+8+h*a,"*"));c.push(g!==0?r.UTF8ToString(g):Number(r.getValue(n+8+(h+p)*a,"*")))}return[u,l,c]}finally{r.stackRestore(i),n!==0&&r._OrtFree(n)}},ri=e=>{let t=me(),r=t._malloc(e.byteLength);if(r===0)throw new Error(`Can't create a session. failed to allocate a buffer of size ${e.byteLength}.`);return t.HEAPU8.set(e,r),[r,e.byteLength]},$a=async(e,t)=>{let r,i,n=me();Array.isArray(e)?[r,i]=e:e.buffer===n.HEAPU8.buffer?[r,i]=[e.byteOffset,e.byteLength]:[r,i]=ri(e);let a=0,s=0,u=0,l=[],p=[],c=[];try{if([s,l]=await Np(t),t?.externalData&&n.mountExternalData){let k=[];for(let I of t.externalData){let C=typeof I=="string"?I:I.path,A=typeof I=="string"?I:I.data;k.push(ni(A).then(x=>{n.mountExternalData(C,x)}))}await Promise.all(k)}for(let k of t?.executionProviders??[])if((typeof k=="string"?k:k.name)==="webnn"){if(n.shouldTransferToMLTensor=!1,typeof k!="string"){let I=k,C=I?.context,A=I?.gpuDevice,x=I?.deviceType,N=I?.powerPreference;C?n.currentContext=C:A?n.currentContext=await n.webnnCreateMLContext(A):n.currentContext=await n.webnnCreateMLContext({deviceType:x,powerPreference:N})}else n.currentContext=await n.webnnCreateMLContext();break}a=await n._OrtCreateSession(r,i,s),n.webgpuOnCreateSession?.(a),a===0&&fe("Can't create a session."),n.jsepOnCreateSession?.(),n.currentContext&&(n.webnnRegisterMLContext(a,n.currentContext),n.currentContext=void 0,n.shouldTransferToMLTensor=!0);let[h,g]=ip(a),_=!!t?.enableGraphCapture,y=[],v=[],S=[],$=[],w=[];for(let k=0;k<h;k++){let[I,C,A]=En(a,k);I===0&&fe("Can't get an input name."),p.push(I);let x=n.UTF8ToString(I);y.push(x),S.push(C===0?{name:x,isTensor:!1}:{name:x,isTensor:!0,type:lt(C),shape:A})}for(let k=0;k<g;k++){let[I,C,A]=En(a,k+h);I===0&&fe("Can't get an output name."),c.push(I);let x=n.UTF8ToString(I);v.push(x),$.push(C===0?{name:x,isTensor:!1}:{name:x,isTensor:!0,type:lt(C),shape:A});{if(_&&t?.preferredOutputLocation===void 0){w.push("gpu-buffer");continue}let N=typeof t?.preferredOutputLocation=="string"?t.preferredOutputLocation:t?.preferredOutputLocation?.[x]??"cpu",L=n.webnnIsGraphOutput;if(N==="cpu"&&L&&L(a,x)){w.push("ml-tensor-cpu-output");continue}if(N!=="cpu"&&N!=="cpu-pinned"&&N!=="gpu-buffer"&&N!=="ml-tensor")throw new Error(`Not supported preferred output location: ${N}.`);if(_&&N!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${N}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);w.push(N)}}let T=null;return w.some(k=>k==="gpu-buffer"||k==="ml-tensor"||k==="ml-tensor-cpu-output")&&(u=n._OrtCreateBinding(a),u===0&&fe("Can't create IO binding."),T={handle:u,outputPreferredLocations:w,outputPreferredLocationsEncoded:w.map(k=>k==="ml-tensor-cpu-output"?"ml-tensor":k).map(k=>Bn(k))}),yt.set(a,[a,p,c,T,_,!1]),[a,y,v,S,$]}catch(h){throw p.forEach(g=>n._OrtFree(g)),c.forEach(g=>n._OrtFree(g)),u!==0&&n._OrtReleaseBinding(u)!==0&&fe("Can't release IO binding."),a!==0&&n._OrtReleaseSession(a)!==0&&fe("Can't release session."),h}finally{n._free(r),s!==0&&n._OrtReleaseSessionOptions(s)!==0&&fe("Can't release session options."),l.forEach(h=>n._free(h)),n.unmountExternalData?.()}},ba=e=>{let t=me(),r=yt.get(e);if(!r)throw new Error(`cannot release session. invalid session id: ${e}`);let[i,n,a,s,u]=r;s&&(u&&t._OrtClearBoundOutputs(s.handle)!==0&&fe("Can't clear bound outputs."),t._OrtReleaseBinding(s.handle)!==0&&fe("Can't release IO binding.")),t.jsepOnReleaseSession?.(e),t.webnnOnReleaseSession?.(e),t.webgpuOnReleaseSession?.(e),n.forEach(l=>t._OrtFree(l)),a.forEach(l=>t._OrtFree(l)),t._OrtReleaseSession(i)!==0&&fe("Can't release session."),yt.delete(e)},lr=new Map,np=1,It=new Map,Dh=e=>{let t=me(),r=t._malloc(e.byteLength);if(r===0)throw new Error(`Can't create a LoRA adapter. failed to allocate a buffer of size ${e.byteLength}.`);try{t.HEAPU8.set(e,r);let i=t._OrtCreateLoraAdapter(r,e.byteLength);i===0&&fe("Can't create a LoRA adapter.");let n=np++;return lr.set(n,i),n}finally{t._free(r)}},Uh=e=>{let t=me(),r=lr.get(e);if(r===void 0)throw new Error(`cannot release LoRA adapter. invalid adapter id: ${e}`);if(It.has(e))throw new Error(`cannot release LoRA adapter. the adapter is used by a run in progress. adapter id: ${e}`);t._OrtReleaseLoraAdapter(r)!==0&&fe("Can't release LoRA adapter."),lr.delete(e)},Cn=async(e,t,r,i,n,a,s=!1)=>{if(!e){t.push(0);return}let u=me(),l=u.PTR_SIZE,p=e[0],c=e[1],h=e[3],g=h,_,y;if(p==="string"&&(h==="gpu-buffer"||h==="ml-tensor"))throw new Error("String tensor is not supported on GPU.");if(s&&h!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${a} when enableGraphCapture is true.`);if(h==="gpu-buffer"){let $=e[2].gpuBuffer;y=Ot(At(p),c);{let w=u.jsepRegisterBuffer;if(!w)throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');_=w(i,a,$,y)}}else if(h==="ml-tensor"){let $=e[2].mlTensor;y=Ot(At(p),c);let w=u.webnnRegisterMLTensor;if(!w)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');_=w(i,$,At(p),c)}else{let $=e[2];if(Array.isArray($)){y=l*$.length,_=u._malloc(y),r.push(_);for(let w=0;w<$.length;w++){if(typeof $[w]!="string")throw new TypeError(`tensor data at index ${w} is not a string`);u.setValue(_+w*l,Qe($[w],r),"*")}}else{let w=u.webnnIsGraphInput,T=u.webnnIsGraphOutput;if(p!=="string"&&w&&T){let k=u.UTF8ToString(n);if(w(i,k)||T(i,k)){let I=At(p);y=Ot(I,c),g="ml-tensor";let C=u.webnnCreateTemporaryTensor,A=u.webnnUploadTensor;if(!C||!A)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');let x=await C(i,I,c);A(x,new Uint8Array($.buffer,$.byteOffset,$.byteLength)),_=x}else y=$.byteLength,_=u._malloc(y),r.push(_),u.HEAPU8.set(new Uint8Array($.buffer,$.byteOffset,y),_)}else y=$.byteLength,_=u._malloc(y),r.push(_),u.HEAPU8.set(new Uint8Array($.buffer,$.byteOffset,y),_)}}let v=u.stackSave(),S=u.stackAlloc(4*c.length);try{c.forEach((w,T)=>u.setValue(S+T*l,w,l===4?"i32":"i64"));let $=u._OrtCreateTensor(At(p),_,y,S,c.length,Bn(g));$===0&&fe(`Can't create tensor for input/output. session=${i}, index=${a}.`),t.push($)}finally{u.stackRestore(v)}},va=async(e,t,r,i,n,a,s=[])=>{let u=me(),l=u.PTR_SIZE,p=yt.get(e);if(!p)throw new Error(`cannot run inference. invalid session id: ${e}`);let c=p[0],h=p[1],g=p[2],_=p[3],y=p[4],v=p[5],S=[];if(s.length>0){if(_)throw new Error("LoRA adapters are not supported for a session that uses IO binding, e.g. when an output is preferred to be on GPU, or when the WebNN execution provider produces an output.");for(let O of s){let W=lr.get(O);if(W===void 0)throw new Error(`cannot run inference. invalid LoRA adapter id: ${O}`);S.push(W)}}let $=t.length,w=i.length,T=0,k=[],I=[],C=[],A=[],x=[],N=u.stackSave(),L=u.stackAlloc($*l),X=u.stackAlloc($*l),Q=u.stackAlloc(w*l),J=u.stackAlloc(w*l);try{for(let P of s)It.set(P,(It.get(P)??0)+1);[T,k]=Mp(a,S),Rt("wasm prepareInputOutputTensor");for(let P=0;P<$;P++)await Cn(r[P],I,A,e,h[t[P]],t[P],y);for(let P=0;P<w;P++)await Cn(n[P],C,A,e,g[i[P]],$+i[P],y);Bt("wasm prepareInputOutputTensor");for(let P=0;P<$;P++)u.setValue(L+P*l,I[P],"*"),u.setValue(X+P*l,h[t[P]],"*");for(let P=0;P<w;P++)u.setValue(Q+P*l,C[P],"*"),u.setValue(J+P*l,g[i[P]],"*");if(_&&!v){let{handle:P,outputPreferredLocations:se,outputPreferredLocationsEncoded:ne}=_;if(h.length!==$)throw new Error(`input count from feeds (${$}) is expected to be always equal to model's input count (${h.length}).`);Rt("wasm bindInputsOutputs");for(let te=0;te<$;te++){let U=t[te];await u._OrtBindInput(P,h[U],I[te])!==0&&fe(`Can't bind input[${te}] for session=${e}.`)}for(let te=0;te<w;te++){let U=i[te];n[te]?.[3]?(x.push(C[te]),u._OrtBindOutput(P,g[U],C[te],0)!==0&&fe(`Can't bind pre-allocated output[${te}] for session=${e}.`)):u._OrtBindOutput(P,g[U],0,ne[U])!==0&&fe(`Can't bind output[${te}] to ${se[te]} for session=${e}.`)}Bt("wasm bindInputsOutputs"),yt.set(e,[c,h,g,_,y,!0])}u.jsepOnRunStart?.(c),u.webnnOnRunStart?.(c);let O;_?O=await u._OrtRunWithBinding(c,_.handle,w,Q,T):O=await u._OrtRun(c,X,L,$,J,w,Q,T),O!==0&&fe("failed to call OrtRun().");let W=[],Y=[];Rt("wasm ProcessOutputTensor");for(let P=0;P<w;P++){let se=Number(u.getValue(Q+P*l,"*"));if(se===C[P]||x.includes(C[P])){W.push(n[P]),se!==C[P]&&u._OrtReleaseTensor(se)!==0&&fe("Can't release tensor.");continue}let ne=u.stackSave(),te=u.stackAlloc(4*l),U=!1,H,F=0;try{u._OrtGetTensorData(se,te,te+l,te+2*l,te+3*l)!==0&&fe(`Can't access output tensor data on index ${P}.`);let V=l===4?"i32":"i64",Se=Number(u.getValue(te,V));F=u.getValue(te+l,"*");let Ve=u.getValue(te+l*2,"*"),ze=Number(u.getValue(te+l*3,V)),Ie=[];for(let $e=0;$e<ze;$e++)Ie.push(Number(u.getValue(Ve+$e*l,V)));u._OrtFree(Ve)!==0&&fe("Can't free memory for tensor dims.");let ke=Ie.reduce(($e,be)=>$e*be,1);H=lt(Se);let Ye=_?.outputPreferredLocations[i[P]];if(H==="string"){if(Ye==="gpu-buffer"||Ye==="ml-tensor")throw new Error("String tensor is not supported on GPU.");let $e=[];for(let be=0;be<ke;be++){let Ae=u.getValue(F+be*l,"*"),ye=u.getValue(F+(be+1)*l,"*"),Qt=be===ke-1?void 0:ye-Ae;$e.push(u.UTF8ToString(Ae,Qt))}W.push([H,Ie,$e,"cpu"])}else if(Ye==="gpu-buffer"&&ke>0){let $e=u.jsepGetBuffer;if(!$e)throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let be=$e(F),Ae=Ot(Se,ke);if(Ae===void 0||!ia(H))throw new Error(`Unsupported data type: ${H}`);U=!0,W.push([H,Ie,{gpuBuffer:be,download:u.jsepCreateDownloader(be,Ae,H),dispose:()=>{u._OrtReleaseTensor(se)!==0&&fe("Can't release tensor.")}},"gpu-buffer"])}else if(Ye==="ml-tensor"&&ke>0){let $e=u.webnnEnsureTensor,be=u.webnnIsGraphInputOutputTypeSupported;if(!$e||!be)throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(Ot(Se,ke)===void 0||!na(H))throw new Error(`Unsupported data type: ${H}`);if(!be(e,H,!1))throw new Error(`preferredLocation "ml-tensor" for ${H} output is not supported by current WebNN Context.`);let Ae=await $e(e,F,Se,Ie,!1);U=!0,W.push([H,Ie,{mlTensor:Ae,download:u.webnnCreateMLTensorDownloader(F,H),dispose:()=>{u.webnnReleaseTensorId(F),u._OrtReleaseTensor(se)}},"ml-tensor"])}else if(Ye==="ml-tensor-cpu-output"&&ke>0){let $e=u.webnnCreateMLTensorDownloader(F,H)(),be=W.length;U=!0,Y.push((async()=>{let Ae=[be,await $e];return u.webnnReleaseTensorId(F),u._OrtReleaseTensor(se),Ae})()),W.push([H,Ie,[],"cpu"])}else{let $e=ii(H),be=new $e(ke);new Uint8Array(be.buffer,be.byteOffset,be.byteLength).set(u.HEAPU8.subarray(F,F+be.byteLength)),W.push([H,Ie,be,"cpu"])}}finally{u.stackRestore(ne),H==="string"&&F&&u._free(F),U||u._OrtReleaseTensor(se)}}_&&!y&&(u._OrtClearBoundOutputs(_.handle)!==0&&fe("Can't clear bound outputs."),yt.set(e,[c,h,g,_,y,!1]));for(let[P,se]of await Promise.all(Y))W[P][2]=se;return Bt("wasm ProcessOutputTensor"),W}finally{u.webnnOnRunEnd?.(c),u.stackRestore(N),I.forEach(O=>u._OrtReleaseTensor(O)),C.forEach(O=>u._OrtReleaseTensor(O)),A.forEach(O=>u._free(O)),T!==0&&u._OrtReleaseRunOptions(T),k.forEach(O=>u._free(O));for(let O of s){let W=It.get(O)-1;W===0?It.delete(O):It.set(O,W)}}},xa=e=>{let t=me(),r=yt.get(e);if(!r)throw new Error("invalid session id");let i=r[0],n=t._OrtEndProfiling(i);n===0&&fe("Can't get an profile file name."),t._OrtFree(n)},Sa=e=>{let t=[];for(let r of e){let i=r[2];!Array.isArray(i)&&"buffer"in i&&t.push(i.buffer)}return t}}),it,qe,Vt,dr,pr,Vr,zn,Gr,Et,Ct,ap,Lh,qh,Wh,Vh,Gh,Hh,Fh,jh,Kh,ka=D(()=>{"use strict";Pe(),Ph(),Ut(),ea(),aa(),it=()=>!!_e.wasm.proxy&&typeof document<"u",Vt=!1,dr=!1,pr=!1,Gr=new Map,Et=(e,t)=>{let r=Gr.get(e);r?r.push(t):Gr.set(e,[t])},Ct=()=>{if(Vt||!dr||pr||!qe)throw new Error("worker not ready")},ap=e=>{switch(e.data.type){case"init-wasm":Vt=!1,e.data.err?(pr=!0,zn[1](e.data.err)):(dr=!0,zn[0]()),Vr&&(URL.revokeObjectURL(Vr),Vr=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let t=Gr.get(e.data.type);e.data.err?t.shift()[1](e.data.err):t.shift()[0](e.data.out);break}default:}},Lh=async()=>{if(!dr){if(Vt)throw new Error("multiple calls to 'initWasm()' detected.");if(pr)throw new Error("previous call to 'initWasm()' failed.");if(Vt=!0,it())return new Promise((e,t)=>{qe?.terminate(),Rp().then(([r,i])=>{try{qe=i,qe.onerror=a=>t(a),qe.onmessage=ap,zn=[e,t];let n={type:"init-wasm",in:_e};!n.in.wasm.wasmPaths&&(r||Rn)&&(n.in.wasm.wasmPaths={wasm:new URL(""+new URL("ort-wasm-simd-threaded.jsep.wasm",import.meta.url).href,import.meta.url).href}),qe.postMessage(n),Vr=r}catch(n){t(n)}},t)});try{await ta(_e.wasm),await _a(_e),dr=!0}catch(e){throw pr=!0,e}finally{Vt=!1}}},qh=async e=>{if(it())return Ct(),new Promise((t,r)=>{Et("init-ep",[t,r]);let i={type:"init-ep",in:{epName:e,env:_e}};qe.postMessage(i)});await wa(_e,e)},Wh=async e=>it()?(Ct(),new Promise((t,r)=>{Et("copy-from",[t,r]);let i={type:"copy-from",in:{buffer:e}};qe.postMessage(i,[e.buffer])})):ri(e),Vh=async(e,t)=>{if(it()){if(t?.preferredOutputLocation)throw new Error('session option "preferredOutputLocation" is not supported for proxy.');return Ct(),new Promise((r,i)=>{Et("create",[r,i]);let n={type:"create",in:{model:e,options:{...t}}},a=[];e instanceof Uint8Array&&a.push(e.buffer),qe.postMessage(n,a)})}else return $a(e,t)},Gh=async e=>{if(it())return Ct(),new Promise((t,r)=>{Et("release",[t,r]);let i={type:"release",in:e};qe.postMessage(i)});ba(e)},Hh=async e=>{if(it())throw new Error("LoRA adapter is not supported for proxy.");let t=typeof e=="string"?await ni(e):e;return Dh(t)},Fh=async e=>{if(it())throw new Error("LoRA adapter is not supported for proxy.");Uh(e)},jh=async(e,t,r,i,n,a,s)=>{if(it()){if(s.length>0)throw new Error("LoRA adapter is not supported for proxy.");if(r.some(u=>u[3]!=="cpu"))throw new Error("input tensor on GPU is not supported for proxy.");if(n.some(u=>u))throw new Error("pre-allocated output tensor is not supported for proxy.");return Ct(),new Promise((u,l)=>{Et("run",[u,l]);let p=r,c={type:"run",in:{sessionId:e,inputIndices:t,inputs:p,outputIndices:i,options:a}};qe.postMessage(c,Sa(p))})}else return va(e,t,r,i,n,a,s)},Kh=async e=>{if(it())return Ct(),new Promise((t,r)=>{Et("end-profiling",[t,r]);let i={type:"end-profiling",in:e};qe.postMessage(i)});xa(e)}}),Ta,Zh=D(()=>{"use strict";Pe(),ka(),Ta=class{async loadAdapter(e){We(),this.adapterId=await Hh(e),De()}async dispose(){return Fh(this.adapterId)}}}),An,sp,Qh,Cy=D(()=>{"use strict";Pe(),Zh(),ka(),ee(),Jn(),aa(),An=(e,t)=>{switch(e.location){case"cpu":return[e.type,e.dims,e.data,"cpu"];case"gpu-buffer":return[e.type,e.dims,{gpuBuffer:e.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[e.type,e.dims,{mlTensor:e.mlTensor},"ml-tensor"];default:throw new Error(`invalid data location: ${e.location} for ${t()}`)}},sp=e=>{switch(e[3]){case"cpu":return new Xe(e[0],e[2],e[1]);case"gpu-buffer":{let t=e[0];if(!ia(t))throw new Error(`not supported data type: ${t} for deserializing GPU tensor`);let{gpuBuffer:r,download:i,dispose:n}=e[2];return Xe.fromGpuBuffer(r,{dataType:t,dims:e[1],download:i,dispose:n})}case"ml-tensor":{let t=e[0];if(!na(t))throw new Error(`not supported data type: ${t} for deserializing MLTensor tensor`);let{mlTensor:r,download:i,dispose:n}=e[2];return Xe.fromMLTensor(r,{dataType:t,dims:e[1],download:i,dispose:n})}default:throw new Error(`invalid data location: ${e[3]}`)}},Qh=class{async fetchModelAndCopyToWasmMemory(e){return Wh(await ni(e))}async loadModel(e,t){We();let r;typeof e=="string"?r=await this.fetchModelAndCopyToWasmMemory(e):r=e,[this.sessionId,this.inputNames,this.outputNames,this.inputMetadata,this.outputMetadata]=await Vh(r,t),De()}async dispose(){return Gh(this.sessionId)}async run(e,t,r,i=[]){We();let n=i.map(_=>{if(!(_ instanceof Ta))throw new Error("LoRA adapter was not created by the WebAssembly backend.");return _.adapterId}),a=[],s=[];Object.entries(e).forEach(_=>{let y=_[0],v=_[1],S=this.inputNames.indexOf(y);if(S===-1)throw new Error(`invalid input '${y}'`);a.push(v),s.push(S)});let u=[],l=[];Object.entries(t).forEach(_=>{let y=_[0],v=_[1],S=this.outputNames.indexOf(y);if(S===-1)throw new Error(`invalid output '${y}'`);u.push(v),l.push(S)});let p=a.map((_,y)=>An(_,()=>`input "${this.inputNames[s[y]]}"`)),c=u.map((_,y)=>_?An(_,()=>`output "${this.outputNames[l[y]]}"`):null),h=await jh(this.sessionId,s,p,l,c,r,n),g={};for(let _=0;_<h.length;_++)g[this.outputNames[l[_]]]=u[_]??sp(h[_]);return De(),g}startProfiling(){}endProfiling(){Kh(this.sessionId)}}}),Xh,zy=D(()=>{"use strict";Xh=e=>{if(e?.epContextDataRead)throw new Error('session option "epContextDataRead" is not supported by ONNX Runtime Web')}}),Yh={};Zt(Yh,{OnnxruntimeWebAssemblyBackend:()=>jn,initializeFlags:()=>Fn,wasmBackend:()=>Jh});var Fn,jn,Jh,Ay=D(()=>{"use strict";Pe(),Zh(),ka(),Cy(),zy(),Fn=()=>{(typeof _e.wasm.initTimeout!="number"||_e.wasm.initTimeout<0)&&(_e.wasm.initTimeout=0);let e=_e.wasm.simd;if(typeof e!="boolean"&&e!==void 0&&e!=="fixed"&&e!=="relaxed"&&(console.warn(`Property "env.wasm.simd" is set to unknown value "${e}". Reset it to \`false\` and ignore SIMD feature checking.`),_e.wasm.simd=!1),typeof _e.wasm.proxy!="boolean"&&(_e.wasm.proxy=!1),typeof _e.wasm.trace!="boolean"&&(_e.wasm.trace=!1),typeof _e.wasm.numThreads!="number"||!Number.isInteger(_e.wasm.numThreads)||_e.wasm.numThreads<=0)if(typeof self<"u"&&!self.crossOriginIsolated)_e.wasm.numThreads=1;else{let t=typeof navigator>"u"?f0("node:os").cpus().length:navigator.hardwareConcurrency;_e.wasm.numThreads=Math.min(4,Math.ceil((t||1)/2))}},jn=class{async init(e){Fn(),await Lh(),await qh(e)}async createInferenceSessionHandler(e,t){Xh(t);let r=new Qh;return await r.loadModel(e,t),r}async createLoraAdapterHandler(e){let t=new Ta;return await t.loadAdapter(e),t}},Jh=new jn});Pe();Pe();Pe();var Oy="1.31.1";{let e=(Ay(),yr(Yh)).wasmBackend;Ht("webgpu",e,5),Ht("webnn",e,5),Ht("cpu",e,10),Ht("wasm",e,10)}Object.defineProperty(_e.versions,"web",{value:Oy,enumerable:!0});/**
* @license
* Copyright 2021 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*//**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 *//**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function op(e,t,r={}){const{threshold:i=.5,featherRadius:n=1.5,despill:a=!0}=r,s=e.width,u=e.height,l=s*u,p=e.data,c=new ImageData(s,u),h=c.data;for(let g=0;g<l;g++){const _=g*4;h[_]=p[_],h[_+1]=p[_+1],h[_+2]=p[_+2];let y=t[g];y<=1&&(y*=255);let v=0;if(y>245)v=255;else if(y<10)v=0;else{const S=y/255,$=1/(1+Math.exp(-12*(S-i)));v=Math.round($*255)}h[_+3]=v}if(a)for(let g=1;g<u-1;g++)for(let _=1;_<s-1;_++){const y=(g*s+_)*4,v=h[y+3];if(v>10&&v<240){let S=0,$=0,w=0,T=0;for(let k=-1;k<=1;k++)for(let I=-1;I<=1;I++){if(I===0&&k===0)continue;const C=((g+k)*s+(_+I))*4;h[C+3]>200&&(S+=h[C],$+=h[C+1],w+=h[C+2],T++)}if(T>0){const k=(255-v)/255*.6;h[y]=Math.round(h[y]*(1-k)+S/T*k),h[y+1]=Math.round(h[y+1]*(1-k)+$/T*k),h[y+2]=Math.round(h[y+2]*(1-k)+w/T*k)}}}return c}_e.wasm.wasmPaths="https://cdn.jsdelivr.net/npm/onnxruntime-web@1.20.1/dist/";_e.wasm.numThreads=typeof crossOriginIsolated<"u"&&crossOriginIsolated?Math.min(4,navigator.hardwareConcurrency||4):1;let Gt=null,Ry=null,cr=!1;self.onmessage=async e=>{const{type:t,payload:r}=e.data;if(t==="CANCEL"){cr=!0;return}if(t==="LOAD_MODEL"){try{const{modelBuffer:i,modelUrl:n,provider:a="webgpu"}=r;cr=!1;const s=a==="webgpu"?["webgpu","wasm"]:["wasm"];self.postMessage({type:"STATUS",status:"initializing_model",message:`Initializing Segmentation Model (${s[0]})...`}),Gt=await Zr.create(i,{executionProviders:s,graphOptimizationLevel:"all"}),Ry=n,self.postMessage({type:"MODEL_LOADED",success:!0})}catch(i){console.warn("Segmentation model WebGPU failed, attempting WASM fallback:",i);try{Gt=await Zr.create(r.modelBuffer,{executionProviders:["wasm"]}),self.postMessage({type:"MODEL_LOADED",success:!0,fallback:!0})}catch(n){self.postMessage({type:"ERROR",error:n.message||"Failed to initialize background removal model."})}}return}if(t==="REMOVE_BG")try{cr=!1;const{imageData:i,mode:n="ai",options:a={threshold:.5,featherRadius:1.5,despill:!0}}=r,{width:s,height:u,data:l}=i;if(n==="procedural"||!Gt){self.postMessage({type:"PROGRESS",percent:30,message:"Analyzing image contours..."});const T=Ny(i);self.postMessage({type:"PROGRESS",percent:70,message:"Refining alpha edges..."});const k=op(i,T,a);self.postMessage({type:"COMPLETE",result:k},[k.data.buffer]);return}self.postMessage({type:"PROGRESS",percent:15,message:"Preparing image tensor (1024x1024)..."});const p=1024,c=By(i,p);if(cr){self.postMessage({type:"CANCELLED"});return}self.postMessage({type:"PROGRESS",percent:40,message:"Running anime neural segmentation..."});const h=Gt.inputNames[0],g=new Xe("float32",c,[1,3,p,p]),_={[h]:g},y=await Gt.run(_);if(cr){self.postMessage({type:"CANCELLED"});return}self.postMessage({type:"PROGRESS",percent:75,message:"Rescaling mask & refining hair strands..."});const S=y[Gt.outputNames[0]].data,$=My(S,p,p,s,u),w=op(i,$,a);self.postMessage({type:"COMPLETE",result:w},[w.data.buffer])}catch(i){self.postMessage({type:"ERROR",error:i.message||"Background removal failed."})}};function By(e,t){const{width:r,height:i,data:n}=e,a=new Float32Array(3*t*t);for(let s=0;s<t;s++){const u=Math.min(i-1,Math.floor(s/t*i));for(let l=0;l<t;l++){const p=Math.min(r-1,Math.floor(l/t*r)),c=(u*r+p)*4,h=s*t+l,g=(On(n[c])-.5)/.5,_=(On(n[c+1])-.5)/.5,y=(On(n[c+2])-.5)/.5;a[0*t*t+h]=g,a[1*t*t+h]=_,a[2*t*t+h]=y}}return a}function On(e){return e/255}function My(e,t,r,i,n){const a=new Float32Array(i*n),s=t/i,u=r/n;for(let l=0;l<n;l++){const p=l*u,c=Math.floor(p),h=Math.min(r-1,c+1),g=p-c;for(let _=0;_<i;_++){const y=_*s,v=Math.floor(y),S=Math.min(t-1,v+1),$=y-v,w=Hr(e[c*t+v]),T=Hr(e[c*t+S]),k=Hr(e[h*t+v]),I=Hr(e[h*t+S]),C=w*(1-$)*(1-g)+T*$*(1-g)+k*(1-$)*g+I*$*g;a[l*i+_]=C}}return a}function Hr(e){return e>15?1:e<-15?0:1/(1+Math.exp(-e))}function Ny(e){const{width:t,height:r,data:i}=e,n=new Float32Array(t*r),a=[0,(t-1)*4,(r-1)*t*4,(r*t-1)*4];let s=0,u=0,l=0;for(const g of a)s+=i[g],u+=i[g+1],l+=i[g+2];s/=4,u/=4,l/=4;const p=t/2,c=r/2,h=Math.sqrt(p*p+c*c);for(let g=0;g<r;g++)for(let _=0;_<t;_++){const y=(g*t+_)*4,v=i[y],S=i[y+1],$=i[y+2],w=Math.sqrt(Math.pow(v-s,2)+Math.pow(S-u,2)+Math.pow($-l,2)),T=Math.sqrt(Math.pow(_-p,2)+Math.pow(g-c,2))/h,k=Math.max(0,1-T*.9);let I=w/120*(.5+k*.7);I=Math.min(1,Math.max(0,I)),n[g*t+_]=I}return n}
