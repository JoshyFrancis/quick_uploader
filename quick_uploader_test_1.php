<?php
		/* 				All Thanks and Praise to My Lord Jesus Christ
		  * 				All Thanks and Praise to My Lord Jesus Christ
		  * 				All Thanks and Praise to My Lord Jesus Christ
	  */
error_reporting(E_ALL);
			function is_dir_empty1($dir) {
			  $handle = opendir($dir);
			  while (false !== ($entry = readdir($handle))) {
				if ($entry != "." && $entry != "..") {
				  return FALSE;
				}
			  }
			  return TRUE;
			}
			function is_dir_empty($dir) {
			  if (!is_readable($dir)) return NULL; 
			  return (count(scandir($dir)) == 2);
			}
			function remove_dir($dir){
				if (is_dir($dir)){
					foreach (scandir($dir) as $item){
						if ($item == "." || $item == "..")
							continue;

						if (is_dir($item)){
							remove_dir($item);
						} else {
							unlink(join(DIRECTORY_SEPARATOR, array($dir, $item)));
						}

					}
					rmdir($dir);
				}
			}
		if(isset($_REQUEST['head'])){	
			switch ($_REQUEST['head']) {
				case 'upload':
				// Very Very Important  in linux
				// chmod 0777 /var/www/domain/public/file_upload
				
					$filedata=$_REQUEST['data'];
					$filename=urldecode( $_REQUEST['file']);
					$filetype=urldecode( $_REQUEST['type']);
					$chunk=intval($_REQUEST['chunk']);
					$num_chunks=intval($_REQUEST['num_chunks']);
					$size=intval($_REQUEST['size']);
					$id=$_REQUEST['id'];
							 
					$response=[];
							$response['success']=false;
							$response['size']=$size;
							$response['id']=$id;
							$response['num_chunks']=$num_chunks;
							
					$dir='uploads';
					if (is_dir($dir)==false){
						mkdir ($dir, 0777);
					}
						$target_file=$dir.DIRECTORY_SEPARATOR. $filename;
					if(file_exists($target_file)){
							
					}
					 if(stripos($filedata,'base64')>0){
							//$filedata =substr($filedata,stripos($filedata,'base64')+strlen('base64')+1);
							$filedata = explode( ';base64,', $filedata )[1];
							$filedata = base64_decode($filedata);
							
						 //file_put_contents( $filename, $filedata, FILE_APPEND ); 
						 //file_put_contents($dir.DIRECTORY_SEPARATOR. $chunk, $filedata  ); 
						 
								$temp_dir=$dir.DIRECTORY_SEPARATOR. urlencode( $id);
								if (is_dir($temp_dir)==false){
									mkdir ($temp_dir, 0777);
								}
								#try{
										$chunk_file=$temp_dir.DIRECTORY_SEPARATOR.$chunk;
										if(!file_exists($chunk_file)){
											$file_handle = fopen($chunk_file, "wb");
											fwrite($file_handle, $filedata);
											fclose($file_handle);
										}
									$chunk+=1;
									$response['success']=true;
								#}catch(Exception $e){
								#	$response['success']=false;
								#}
								 $response['chunk']=$chunk;
								
						 if($chunk>=($num_chunks  )   ){
								
									if(file_exists($target_file)){
										unlink($target_file);
									}
								$target = fopen($target_file, 'wb');
								for ($i=0; $i<$num_chunks; $i++){
										$chunk_file=$temp_dir.DIRECTORY_SEPARATOR.$i;
									#if(file_exists($chunk_file)){
										$chunk = fopen($chunk_file, "rb");
										stream_copy_to_stream($chunk, $target);
										fclose($chunk);
									#}
								}

								// Success
								fclose($target);

							if(filesize($target_file)==$size){
								for ($i=0; $i<$num_chunks; $i++){
									$chunk_file=$temp_dir.DIRECTORY_SEPARATOR.$i;
									#if(file_exists($chunk_file)){
										unlink($chunk_file);
									#}
								}
								#if(is_dir_empty($temp_dir)){
									rmdir($temp_dir);
								#}
							}else{
								$response['success']=false;
							}
						 }

						 
					}
						
						echo json_encode($response);
						return;
				break;
				case 'remove':
					$filename=urldecode( $_REQUEST['file']);
					$id=$_REQUEST['id'];
					$response=[];
							$response['success']=false;
							$response['id']=$id;
					$dir='uploads';
					 
						$target_file=$dir.DIRECTORY_SEPARATOR. $filename;
					if(file_exists($target_file)){
						unlink($target_file);
					}
					$temp_dir=$dir.DIRECTORY_SEPARATOR. urlencode( $id);
					  if(!is_dir_empty($temp_dir)){
						remove_dir($temp_dir);
					 }
							$response['success']=true;
						
						echo json_encode($response);
						return;
				break;
			}
					echo 'ok';
				return;
		}
?>
<!DOCTYPE html>
<html lang="en">

<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width">

	<title>File Upload Test 1</title>
 
		<script src="quick_uploader.js"></script>
</head>
<body >
		<div id="file_upload"> </div>	
			<hr>
		<div id="file_upload2" style="width:50%;"> </div>	
	<script>
		
		
		   var uploader=new quick_uploader(document.getElementById('file_upload'),location.toString().split('?')[0]);
			var uploader2=new quick_uploader(document.getElementById('file_upload2'),location.toString().split('?')[0]);	
	</script>

</body>
</html>
