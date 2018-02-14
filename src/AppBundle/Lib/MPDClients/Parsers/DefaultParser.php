<?php


namespace AppBundle\Lib\MPDClients\Parsers;


class DefaultParser implements ParserInterface
{
    public function parse(string $data): array
    {
        $result = [];
        $raw = explode("\n", trim($data));
        if (is_array($raw)) {
            foreach ($raw as $item) {
                $value = explode(":", $item, 2);
                if ($value[0] === 'OK') {
                    continue;
                }
                $result[$value[0]] = $value[1];
            }
        }

        return $result;
    }

}