#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use tauri::Manager;
use window_shadows::set_shadow;
use tauri_plugin_store::PluginBuilder;
use std::env;

fn main() {
    let context = tauri::generate_context!();
    env::set_var("RUST_BACKTRACE", "1");

    tauri::Builder::default()
        .plugin(PluginBuilder::default().build())
        .menu(if cfg!(target_os = "macos") {
            tauri::Menu::os_default(&context.package_info().name)
        } else {
            tauri::Menu::default()
        })
        .setup(|app| {
            let window = app.get_window("main").unwrap();
            set_shadow(&window, true).expect("Unsupported platform!");
            window.open_devtools();
            Ok(()) // need this
        })
        .run(context)
        .expect("error while running tauri application");
}
