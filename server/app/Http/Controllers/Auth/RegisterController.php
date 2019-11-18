<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after registration.
     *
     * @var string
     */
    protected $redirectTo = '/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            //'name' => ['required', 'string', 'max:255'],
            //'email' => ['string', 'nullable', 'email', 'max:255', 'unique:users'],
            'mobile_phone' => ['required', 'string', 'max:20', 'unique:users'],
            'password' => ['required', 'integer', 'min:6', 'confirmed'],
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return \App\User
     */
    protected function create(array $data)
    {
        $characters = 'abcdefghijklmnopqrstuvwxyz';
        $random_string = '';
        for ($i = 0; $i < 12; $i++) {
            $index = rand(0, strlen($characters) - 1);
            $random_string .= $characters[$index];
        }

        $random_name = $random_string.rand(10, 99);

        return User::create([
            'name' => $random_string,
            'email' => $random_name.'@random-email.rand',
            'mobile_phone' => $data['mobile_phone'],
            'password' => Hash::make($data['password']),
        ]);
    }

    protected function registered(Request $request, $user)
		{
				$user->generateToken();

        $vendor = Vendor::where('user_id', $user->id)->first();
        $user['vendor'] = $vendor;
        if ($vendor !== null) {
          $service_type = ServiceType::where('id', $vendor->service_id)->first();
          $user->vendor['service'] = $service_type;
        }

				return response()->json(
          ['data' => $user],
          201
        );
		}

		public function register(Request $request)
		{
				$this->validator($request->all())->validate();
				$user = $this->create($request->all());
				$this->guard()->login($user);
				return $this->registered($request, $user)
				                ?: redirect($this->redirectPath());
		}
}
