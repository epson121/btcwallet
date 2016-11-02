<?php

namespace Controllers;

use Slim\Http\Request;
use Slim\Http\Response;

class Transaction extends Base
{

    public function create(Request $request, Response $response, array $args)
    {
        $this->render($response, 'transaction/create.phtml');
    }

}