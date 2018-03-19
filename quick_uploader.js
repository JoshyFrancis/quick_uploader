	 /* 				All Thanks and Praise to My Lord Jesus Christ
	  * 				All Thanks and Praise to My Lord Jesus Christ
	  * 				All Thanks and Praise to My Lord Jesus Christ
	  * 
		* Javascript quick_uploader -  v1.0
		* Copyright (c) 2018 Joshy Francis
		  
				Features
				* Pure Javascript No Dependencies
				* Supports Drag Drop
				* Supports Directory Reading
				* Supports Resume
				* Supports File Chunks
		*/
	 function quick_uploader(el,url,g_chunk_size){
				function ajax(o) {
					var url=o.url;
					var type=( o.type || 'post').toUpperCase();
					var data=( o.data || '');
					var cache=( o.cache===undefined?false:o.cache);
					var success=o.success;
					var error=o.error;
					// Must encode data
					if(data && typeof(data) === 'object') {
						var y = '', e = encodeURIComponent;
						for (x in data) {
							y += '&' + e(x) + '=' + e(data[x]);
						}
						data = y.slice(1) + (! cache ? '&_t=' + new Date : '');
					}

					try {
						var x =null;
						if(window.XMLHttpRequest){
								x= new XMLHttpRequest();
						 }else{
							 x=(new  ActiveXObject('MSXML2.XMLHTTP.3.0') ) || (new  ActiveXObject('Microsoft.XMLHTTP') );
						 }
						 //x.open(type, url, 1);
						 if (x && "withCredentials" in x){
							x.open(type, url, true);
						} else if (typeof XDomainRequest != "undefined"){
							x = new XDomainRequest();
							x.open(type, url);
						}
						
						x.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
						//x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
						x.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
						x.onreadystatechange = function () {
							if(x.readyState ==4 &&   x.status >= 200 && x.status < 400 && success){
								success(x.responseText, x);
							}else if(x.readyState ==4 &&  error){
									error(x, x.status);
							}
						};
						
						x.send(data);
					} catch (e) {
						if(error){
							error(x,e);
						}
					}
				}
				 function time_to_human_readable(ms,add){
					var x = ms / 1000;
					var	seconds = (x % 60).toFixed(2);
						x /= 60;
					var	minutes =x>0? (x % 60).toFixed(2):0;
						x /= 60;
					var	hours =x>0?( x % 24).toFixed(2):0;
						x /= 24;
					var	days =x>0?( x).toFixed(2):0;
						x /= 365.25;
					var	years =x>0?( x).toFixed(0):0;
					
					var s=parseInt(years)>0? years + ' years, ':'';
						s+=parseInt(days)>0? days + ' days, ':'';
						s+=parseInt(hours)>0? hours + ' hours, ':'';
						s+=parseInt(minutes)>0? minutes + ' minutes, ':'';
						s+=parseInt(seconds)>0? seconds + ' seconds':'';
						s=	parseInt(seconds)>0?	(add?add+' ' +s:s):'';
						return s;
				 }
				function formatBytes(bytes,decimals) {
				   if(bytes == 0) return '0 Bytes';
				   var k = 1024,
					   dm = decimals || 2,
					   sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
					   i = Math.floor(Math.log(bytes) / Math.log(k));
				   return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
				}
				//var url=location.toString().split('?')[0];
				var file_info=[];
						var html='';
							html+='<div>';
							html+='<input type="file" id="quick_uploader_files'+el.id+'" name="files[]" multiple />';
							html+='<label for="quick_uploader_files'+el.id+'"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"/></svg> <span>Choose files&hellip;</span></label>';
							html+='';
							html+='</div>';
							html+='<div id="quick_uploader_drop_zone'+el.id+'"> Drop files here </div>';
							html+='<ul id="quick_uploader_list'+el.id+'"></ul>';
							html+='<div style="width:100%; height:20px; border:1px solid black;text-align: center; "> <div id="quick_uploader_main_progress'+el.id+'" style="width:0%;/*change this width */  background-color: #99ccff;   height:100%;">  </div></div>';
							
							
							html+='';
							html+='';
								el.innerHTML=html;
				var dropZone = document.getElementById('quick_uploader_drop_zone'+el.id);	
				var list=document.getElementById('quick_uploader_list'+el.id);		
				var main_progress=document.getElementById('quick_uploader_main_progress'+el.id);
				var quick_uploader_files=document.getElementById('quick_uploader_files'+el.id);
					dropZone.style.cssText='border: 2px dashed #bbb;  -moz-border-radius: 5px;  -webkit-border-radius: 5px; border-radius: 5px;   padding: 25px; text-align: center; font: 20pt bold \'Vollkorn\'; color: #bbb;';
					quick_uploader_files.parentNode.style.cssText='background-color:#dfc8ca;padding:1px 1px;';	 
					quick_uploader_files.style.cssText=' width: 0.1px;  height: 0.1px;  opacity: 0;  overflow: hidden;  position: absolute;  z-index: -1;';
					quick_uploader_files.nextSibling.style.cssText=' max-width: 80%; font-size:  20px;font-weight: 700;  text-overflow: ellipsis; white-space: nowrap;  cursor: pointer; display: inline-block; overflow: hidden;  padding: 1px 2px;';
					quick_uploader_files.nextSibling.firstChild.style.cssText=' width: 16px; height: 16px; vertical-align: middle; fill: currentColor;  margin-top:   1px; margin-right:  1px;';
					
  
				var total_size=0,uploaded_size=0;
				var __bind = function(me,fn ){ return function(){ return fn.apply(me, arguments); }; };
				var ajax_begin=false;
				function add_file(f){
							if(file_info.length==0){
								total_size=0;
								uploaded_size=0;
							}
					var index=0;
					var id=escape(f.name)+ '_' + escape(f.type)+ '_' +  f.size + '_' + f.lastModified;
								if(get_index(id)!=-1){
										upload(id);
										return false;
								}
							file_info.push( {
									file: f
								});
							index=file_info.length-1;
							
					 var li=document.getElementById('li_'+ id );
							if(li){										 
								li.parentNode.removeChild(li);	
							}
							
								output = [];
					var li=document.createElement('li');
						li.style.cssText='width:100%;';
						li.id='li_'+id;
					  output.push(' <strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
								  formatBytes(f.size,2), ', last modified: ',
								  f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
								 '<div >',
									'<div style="width:calc(100% - 30%); height:20px; border:1px solid black;text-align: center; display:inline-block;  "> ',
										'<div id="progress_bar'+ id +'" style="width:0%;  background-color: #99ccff;   height:100%;  ">  </div>',
									'</div>',
								'<button style="float: right;"  id="pause'+ id +'" >Pause</button>',
								'<button style="float: right;"    id="remove'+ id +'" >Remove</button>',									
								'</div>',
								'<div  id="rem_time'+ id +'" ></div>',
								  ' ');
							li.innerHTML=output.join('')  ;
							list.appendChild(li);  
					  
						file_info[index].id=id;
						file_info[index].chunk=0;
						file_info[index].finished=false;
						file_info[index].paused=false;
								total_size+=f.size;
								
						upload(id);
				}
				function scanFiles(item) {
				  //alert( item.name);
				   
					 if (item.isDirectory) {
						var directoryReader = item.createReader();
						 
						directoryReader.readEntries(function(entries) {
							entries.forEach(function(entry) {
							  scanFiles(entry);
						  });
						});
					  }else if(item.isFile){
						  //alert(item.fullPath);
						   
							// var file = item.getAsFile(); // same as object in e.dataTransfer.files[]
							 // do something with the file
							  //add_file(file);
						   item.file(function(file){
								add_file(file);
							});
					  }
				}
				function handleFileSelect(evt) {
					evt.stopPropagation();
					evt.preventDefault();
						
						var files =evt.target.files || evt.dataTransfer.files; // FileList object.
						 
							// Chrome only
							if (evt.dataTransfer && evt.dataTransfer.items && evt.dataTransfer.items.length) {
								 var items = evt.dataTransfer.items;
								 for (var i=0; i<items.length; i++) {
									var item = items[i].webkitGetAsEntry();
									  if (item && item.isFile) {
										 //var file = item.getAsFile(); // same as object in e.dataTransfer.files[]
										 // do something with the file
											 item.file(function(file){
												add_file(file);
											});
									  }else if(item && item.isDirectory){
											scanFiles(item);
									  }
								  }
							}else{
								var output = [];
								for (var i = 0, f; f = files[i]; i++) {
									 add_file(f);
								}
							}
						 
					 
						//var percent_done=Math.floor( ( index / file_info.length ) * 100 );											
						//if (percent_done < 100) {		 
						//	main_progress.style.width = percent_done + '%';
						//	main_progress.innerHTML = percent_done + '%';
						//}
				  }

				  function handleDragOver(evt) {
					evt.stopPropagation();
					evt.preventDefault();
					evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
				  }

				  // Setup the dnd listeners.
				  
				  dropZone.ondragover= handleDragOver;
				  dropZone.ondrop= handleFileSelect ;
	 
				quick_uploader_files.onchange= handleFileSelect;
			  
				function get_index(id){
					var index=-1;
						for(var i=0;i<file_info.length;i++){
							if(file_info[i].id==id){
								index=i;
								break;
							}
						}
					return index;
				}
				 function remove_file(id){
				 	var index=-1;
							index=get_index(id);
					if(index==-1){return false;}
							file_info[index].stop=false;
								if(ajax_begin==true){
										file_info[index].stop=true;
										setTimeout(function(){
											remove_file (id);
										},10);
										return false;
								}		
							if(!confirm('Remove this file?')){
								upload(file_info[index].id );
									return false;
							}								
							file_info[index].paused=true;
							upload(file_info[index].id );
							 
						ajax({
								url:  url,
								type: 'POST',
								data:{
										head:'remove'
										,id:id
										,file:encodeURIComponent( file_info[index].file.name)
									},
								success: function (data,xhr) {						  
									try{
										var info=JSON.parse(data);
										if(info.success==true){
												index= get_index(info.id);
											localStorage.removeItem(file_info[index].key);
													uploaded_size-=file_info[index].file.size;
													total_size-=file_info[index].file.size;	
												file_info.splice(index,1);
											  
											 var li=document.getElementById('li_'+ id );
											if(li){										 
												li.parentNode.removeChild(li);	
											}
												 if(total_size>0){
													 var percent_done=Math.floor( ( uploaded_size / total_size ) * 100 );																								
													if (percent_done < 100) {		 
														main_progress.style.width = percent_done + '%';
														main_progress.innerHTML = percent_done + '%';
													}
												}else{
														main_progress.style.width = 100 + '%';
														main_progress.innerHTML = 100 + '%';
												}
										}
									}catch(e){
									}
								} ,
								error:  function (xhr, e) {
									alert(e);
								} ,
						});
				
				 }
				 function upload(id){
					var index=-1;
					
					var pagename=url.split('/').pop().split('?')[0];
								index=get_index(id);
						if(index==-1){return false;}
						
					var file = file_info[index].file;
					var size = file.size;
					var fname=file.name;
					var type=file.type;
					//var milliseconds=file.lastModifiedDate ? file.lastModifiedDate.getTime():0;
					var lastModified=file.lastModified ;
					//var id=escape(f.name)+ '_' + escape(f.type)+ '_' +  f.size + '_' + f.lastModified;
					var id= file_info[index].id;
					var progress=document.getElementById('progress_bar'+id);
					var pause=document.getElementById('pause'+id);
					var rem_time=document.getElementById('rem_time'+id);
					var remove=document.getElementById('remove'+id);
						if(pause){
								 
							pause.onclick=function(){
								var id=this.id.split('pause')[1];
								var index=-1;
										index=get_index(id);
								if(index==-1){return false;}
								 
								if(file_info[index].paused==false){
									this.innerHTML='Resume';
									file_info[index].paused=true;
								}else{
									this.innerHTML='Pause';
									file_info[index].paused=false;
									upload(file_info[index].id);								
								}
							};
							if(file_info[index].paused==true){
								pause.innerHTML='Resume';
							}
						}
						if(remove){
							remove.onclick=function(){

								var id=this.id.split('remove')[1];
									remove_file(id);
							};
						 
						}
					var chunk_size=g_chunk_size!==undefined && !isNaN(parseInt(g_chunk_size)) ?g_chunk_size:  524288;//1048576;//		524288=512 KB	1048576=1 MB
					var num_chunks = Math.max(Math.ceil(size / chunk_size), 1);
					var key="quick_uploader_" + pagename + "_" + id;//escape(fname);
					
					var chunk=file_info[index].chunk;
					 
					var info= localStorage.getItem(key);
								file_info[index].key=key;
						if(chunk==0){
						 	//progress.className += ' loading';
						 	 
						}							
							try{
								info=JSON.parse(info);
							}catch(e){
								info={};
							}
							if (info && info.chunk && info.chunk>=chunk){
								chunk=info.chunk;
								num_chunks=info.num_chunks;
								 
								file_info[index].chunk=chunk;
								file_info[index].num_chunks=num_chunks;
								 
							}else{
								info={};
							}

								 
								info.chunk=chunk;							 
								info.id=id;
								info.size=size;
								info.lastModified=lastModified;
								info.num_chunks=num_chunks;
						localStorage.setItem(key, JSON.stringify(info));
						
					if(file_info[index].paused==true){
						return;
					}
					if(file_info[index].stop===true){
						return;
					}
						var start =chunk* chunk_size;
						var end = start + chunk_size;
								file_info[index].start_time=(new Date()).getTime();
								ajax_begin=false;	
					if (start < size ){
						var blob=file.slice(start, end);
							var reader = new FileReader();
							   reader.readAsDataURL(blob);
							   reader.onload = function () {
											ajax_begin=true;
										ajax({
											url:  url,
											type: 'POST',
											data:{
													head:'upload'
													,id:id
													,chunk:chunk
													,num_chunks:num_chunks
													,file:encodeURIComponent( fname)
													,type:encodeURIComponent( type)
													,data:reader.result
													,lastModified:lastModified
													,size:size
												 
												},
											success: function (data,xhr) {	
													ajax_begin=false;				  
												try{
													var info=JSON.parse(data);
													if(info.success==true){
														index= get_index(info.id);
														
														size=info.size;
														chunk=info.chunk;
														num_chunks=info.num_chunks;
														
														file_info[index].chunk=chunk;
														file_info[index].num_chunks=num_chunks;
														file_info[index].end_time=(new Date()).getTime();
														var time=file_info[index].end_time-file_info[index].start_time ;
														var time_rem=(num_chunks-(chunk+1))*time;
														
														var percent_done = Math.floor( ( chunk / num_chunks ) * 100 );
														 
															if (percent_done < 100) {
																 
																progress.style.width = percent_done + '%';
																progress.innerHTML = percent_done + '%';
																
															  }
															  if(file_info[index].percent!=percent_done){
																	 
																	rem_time.innerHTML = time_to_human_readable(time_rem,' remaining.')  +   ' uploaded : ' + formatBytes(  ((chunk-1)*chunk_size),2) + '@' + formatBytes(chunk_size,2)  ;
																	file_info[index].percent=percent_done;
															 }
																
																uploaded_size+=blob.size;
																
																 percent_done=Math.floor( ( uploaded_size / total_size ) * 100 );
															 
																	main_progress.style.width = percent_done + '%';
																	main_progress.innerHTML = percent_done + '%';
																 
														if(file_info[index].stop!==true){
															upload(file_info[index].id);
														}
													}
												}catch(e){
												 
													progress.innerHTML='Error: ' +e  ;
													file_info[index].paused=true;
													upload(file_info[index].id );
													//debugger;
												}
											} ,
											error:  function (xhr, e) {
												ajax_begin=false;		
												 //console.log('Error: ', e);
												 progress.innerHTML='Error: ' +e;
												 file_info[index].paused=true;
												 upload(file_info[index].id);
											} ,
									});
							   
							   };
							   reader.onerror = function (e) {
									 //console.log('Error: ', e);
									progress.innerHTML='Error: ' +e;
									file_info[index].paused=true;
									upload(file_info[index].id);
							   };

					}else{
						file_info[index].finished=true;
						 
						progress.style.width = 100 + '%';
						progress.innerHTML = 100 + '%';
							if(pause){
									pause.parentNode.removeChild(pause);
							}
						localStorage.removeItem(file_info[index].key);
						rem_time.innerHTML = 'uploaded : ' + formatBytes(   size ,2) + '@' + formatBytes(chunk_size,2)     ;
						
						//// file_info.splice(index,1);
						 
						 if(file_info.length>0){
							 var percent_done=Math.floor( ( uploaded_size / total_size ) * 100 );
															
							if (percent_done < 100) {		 
								main_progress.style.width = percent_done + '%';
								main_progress.innerHTML = percent_done + '%';
							}
						}else{
							uploaded_size=0;
							total_size=0;
								main_progress.style.width = 100 + '%';
								main_progress.innerHTML = 100 + '%';
						}
						
					}
				 }
				
				return this;
		   }
		 
