<?php

namespace Controllers;


use Slim\Http\Request;
use Slim\Http\Response;

class Address extends Base
{

    public function generate(Request $request, Response $response, array $args)
    {
        $this->render($response, 'address/generate.phtml');
    }

}