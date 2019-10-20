<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use GuzzleHttp\Client;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
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
        $this->middleware('guest')->except('logout');
    }

		public function login(Request $request)
		{
				$this->validateLogin($request);

				if ($this->attemptLogin($request)) {
				    $user = $this->guard()->user();
				    $user->generateToken();

				    return response()->json([
				        'data' => $user->toArray(),
				    ]);
				}

				return $this->sendFailedLoginResponse($request);
		}

		public function logout(Request $request)
		{
				$user = Auth::guard('api')->user();

				if ($user) {
				    $user->api_token = null;
				    $user->save();
				}

				return response()->json(['data' => 'User logged out.'], 200);
		}

		public function confirm_code(Request $request)
		{
        $input  = $request->all();
        $mobile = $input['mobile'];
        $code = rand(100001, 999999);

        $user_exists = DB::table('users')
            ->where('mobile_phone', $mobile)
            ->value('mobile_phone');
        if ($user_exists === null) {
            $registered = false;
        } else {
            $registered = true;
            $updatePass = DB::table('users')
                ->where('mobile_phone', $mobile)
                ->update(['password' => Hash::make($code)]);
            if (!$updatePass) {
                return response()->json(
                    ['data' => ['msg' => 'Code Update Error']],
                    500
                );
            }
        }

        $sms = 'AutoMech confirmation: '.$code;
        $username = 'foxychev';
        $password = 'chevrolet';

        $client = new Client;
        $response = $client->request(
            'GET',
            'https://account.kudisms.net/api/?username='.$username
                .'&password='.$password
                .'&message='.$sms
                .'&sender=AutoMech&mobiles='.$mobile
        );
        $statusCode = $response->getStatusCode();
      	$body = json_decode($response->getBody()->getContents(), true);

        if ($statusCode === 200) {
            if (array_key_exists('status', $body) && $body['status'] === 'OK') {
                return response()->json(
                    ['data' => [
                        'code' => $code,
                        'mobile' => $mobile,
                        'registered' => $registered
                      ]],
                    200
                );
            } else {
              return response()->json(
                  ['data' => [
                      'code' => $code,
                      'mobile' => $mobile,
                      'registered' => $registered
                    ]],
                  200
              );
              return response()->json(
                  ['data' => ['msg' => $body['errno']]],
                  500
              );
            }
        } else {
            return response()->json(
                ['data' => ['msg' => 'SMS Gateway Connection Error']],
                500
            );
      }

		}
}
