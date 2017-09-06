<?php

/*
 * This file is part of the HWIOAuthBundle package.
 *
 * (c) Hardware.Info <opensource@hardware.info>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace AppBundle\Lib;

use HWI\Bundle\OAuthBundle\OAuth\ResourceOwner\GenericOAuth2ResourceOwner;
use HWI\Bundle\OAuthBundle\Security\Core\Authentication\Token\OAuthToken;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\OptionsResolver\Options;

/**
 * VkontakteResourceOwner.
 *
 * @author Adrov Igor <nucleartux@gmail.com>
 * @author Vladislav Vlastovskiy <me@vlastv.ru>
 * @author Alexander Latushkin <alex@skazo4neg.ru>
 */
class VkontakteResourceOwner extends GenericOAuth2ResourceOwner
{
    /**
     * {@inheritdoc}
     */
    protected $paths = [
        'identifier' => 'response.0.uid',
        'nickname' => 'response.0.nickname',
        'firstname' => 'response.0.first_name',
        'lastname' => 'response.0.last_name',
        'realname' => ['response.0.last_name', 'response.0.first_name'],
        'profilepicture' => 'response.0.photo',
        'email' => 'email',
    ];

    /**
     * {@inheritdoc}
     */
    public function getUserInformation(array $accessToken, array $extraParameters = [])
    {
        $url = $this->normalizeUrl(
            $this->options['infos_url'],
            [
                'access_token' => $accessToken['access_token'],
                'fields' => $this->options['fields'],
                'name_case' => $this->options['name_case'],
            ]
        );

        $content = $this->doGetUserInformationRequest($url)->getContent();

        $response = $this->getUserResponse();
        $response->setResponse($content);
        $response->setResourceOwner($this);
        $response->setOAuthToken(new OAuthToken($accessToken));

        $content = $response->getResponse();
        $content['email'] = isset($accessToken['email']) ? $accessToken['email'] : null;
        $response->setResponse($content);
        if (!$response->getNickname() && isset($content['response'][0]['screen_name'])) {
            $content['response'][0]['nickname'] = $content['response'][0]['screen_name'];
            $response->setData($content);
        }

        return $response;
    }

    /**
     * {@inheritdoc}
     */
    protected function configureOptions(OptionsResolver $resolver)
    {
        parent::configureOptions($resolver);

        $resolver->setDefaults(
            [
                'authorization_url' => 'https://oauth.vk.com/authorize',
                'access_token_url' => 'https://oauth.vk.com/access_token',
                'infos_url' => 'https://api.vk.com/method/users.get',

                'scope' => 'email',

                'use_commas_in_scope' => true,

                'fields' => 'nickname,photo_medium,screen_name,email',
                'name_case' => null,
            ]
        );

        $fieldsNormalizer = function (Options $options, $value) {
            if (!$value) {
                return null;
            }

            return is_array($value) ? implode(',', $value) : $value;
        };

        // Symfony <2.6 BC
        if (method_exists($resolver, 'setNormalizer')) {
            $resolver->setNormalizer('fields', $fieldsNormalizer);
        } else {
            $resolver->setNormalizers(
                [
                    'fields' => $fieldsNormalizer,
                ]
            );
        }
    }
}
