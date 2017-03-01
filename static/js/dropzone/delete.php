</p>
include 'db.php';
$upload_dir = 'myuploads';
$targetPath = dirname( __FILE__ ) . DIRECTORY_SEPARATOR . $upload_dir . DIRECTORY_SEPARATOR;
unlink($targetPath.$_GET['fid']);
$obj=new DB();
$sql = "DELETE FROM file_upload WHERE f_name='".$_GET['fid']."'";
$retval = mysqli_query($obj->connection(),$sql);
print_r("Successfully deleted.");
<p style="text-align: justify;">