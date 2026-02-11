use tauri_plugin_opener::OpenerExt;

#[tauri::command]
async fn open_spotify(app: tauri::AppHandle) -> Result<(), String> {
    let opener = app.opener();
    opener
        .open("https://open.spotify.com")
        .await
        .map_err(|e| e.to_string())?
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
