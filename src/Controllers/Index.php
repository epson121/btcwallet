<?php

namespace Controllers;


use Slim\Http\Request;
use Slim\Http\Response;

class Index extends Base
{

    public function index(Request $request, Response $response, array $args)
    {
//        $this->_view->setAttributes([
//            'block_info'       => $data
//        ]);
        $this->render($response, 'index/index.phtml');
    }

}