<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use App\Models\User;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * This seeder attempts to create the admin using the Eloquent model.
     * If the model's $fillable prevents mass assignment, it falls back to
     * inserting directly via the query builder.
     *
     * Adjust the email/password/nombre below as needed.
     */
    public function run()
    {
        $email = 'admin@example.com';
        $passwordPlain = 'admin123';

        // If admin already exists, do nothing
        if (DB::table('users')->where('email', $email)->exists()) {
            $this->command->info("Admin user already exists: {$email}");
            return;
        }

        // Prepare data according to your users table structure
        $data = [
            'nombre' => 'Administrador',
            'email' => $email,
            // Use the column name `contrasena_hash` present in your table
            'contrasena_hash' => Hash::make($passwordPlain),
            'rol' => 'admin',
            'fecha_registro' => now(),
            'created_at' => now(),
            'updated_at' => now(),
        ];

        try {
            // Try creating via the Eloquent model
            User::create($data);
            $this->command->info("Admin user created via User model: {$email}");
        } catch (\Throwable $e) {
            // If model mass assignment or other error occurs, fall back to DB insert
            DB::table('users')->insert($data);
            $this->command->info("Admin user inserted via DB table: {$email}");
        }

        $this->command->info("Admin credentials: {$email} / {$passwordPlain}");
    }
}
