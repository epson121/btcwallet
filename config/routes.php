<?php

$app->get('/', 'Controllers\Index:index');
$app->get('/address/generate', 'Controllers\Address:generate');