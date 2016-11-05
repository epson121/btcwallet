<?php

namespace Controllers;


use Slim\Http\Request;
use Slim\Http\Response;

class HDWallet extends Base
{

    public function index(Request $request, Response $response, array $args)
    {
        $this->render($response, 'hdwallet/index.phtml');
    }

}