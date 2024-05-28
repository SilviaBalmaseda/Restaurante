<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') 
{
    if (isset($_POST['backup']))
    {
        $backup = $_POST['backup'];
        $carpetaBackup = "../backup/";

        if (!file_exists($carpetaBackup)) 
        {
            mkdir($carpetaBackup, 0777, true);
        }

        // El nombre del fichero debe incluir la fecha en la que se ha generado el fichero.
        $fechaActual = date("dmY_His");     // d = día(2), m = mes(2), Y = año(4), H = hora(2), i = minútos(2) y s = segundos(2).
        $nombreArchivo = $carpetaBackup . "backup_" . $fechaActual . ".json";

        // Escribir datos en un fichero.
        // file_put_contents($nombreArchivo, $backup);

        $fd = fopen($NombreArchivo,"a+") or die("Error al abrir el archivo $NombreArchivo");
        fputs($fd, $backup);
        fclose($fd);
    
        $response = [
            "success" => true,
            "message" => "Backup guardado correctamente en: " . $nombreArchivo,
            "backup" => $backup
        ];
    } 
    else 
    {
        $response = [
            "success" => false,
            "message" => "No se encontró el campo 'backup' en la solicitud"
        ];
    }
} 
else 
{
    $response = [
        "success" => false,
        "message" => "La solicitud debe ser de tipo POST"
    ];
}

header('Content-Type: application/json');
echo json_encode($response);    // Convertir el valor dado en un string en formato JSON.
?>