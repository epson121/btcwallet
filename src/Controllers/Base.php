<?php

namespace Controllers;


use Interop\Container\ContainerInterface;
use Slim\Container;
use Slim\Flash\Messages;
use Slim\Views\PhpRenderer;

class Base
{

    /**
     * @var Container
     */
    protected $_ci;

    protected $_helper = '\Helpers\Data';

    protected $_apiModel = '\Models\Api';

    /**
     * @var PhpRenderer
     */
    protected $_view;

    /**
     * @var Messages
     */
    protected $_flash;

    public function __construct(ContainerInterface $container) {
        $this->_ci = $container;
        $this->_view = $this->_ci->get('view');
        $this->_flash = $this->_ci->get('flash');
    }

    public function render($response, $template) {
        $this->_view->addAttribute('helper', $this->getHelper());
        $this->_view->addAttribute('messages', $this->_flash->getMessages());
        return $this->_view->render($response, $template);
    }

    /**
     * @param $classNamew
     * @return \Models\Base
     */
    public function getModel($className) {
        return new $className();
    }

    /**
     * @return \Helpers\Data
     */
    public function getHelper() {
        return new $this->_helper();
    }

    /**
     * @return \Models\Api
     */
    public function getApiModel($url) {
        return new $this->_apiModel($url);
    }

}