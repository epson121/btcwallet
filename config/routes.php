<?php

$app->get('/', 'Controllers\Index:index');
$app->get('/address/generate', 'Controllers\Address:generate');
$app->get('/transaction/create', 'Controllers\Transaction:create');
$app->get('/hdwallet', 'Controllers\HDWallet:index');