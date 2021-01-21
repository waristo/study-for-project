//package wonbae.springblog.service;
//
//import wonbae.springblog.domain.Member;
//import wonbae.springblog.repository.MemberRepository;
//import wonbae.springblog.repository.MemoryMemberRepository;
//
//public class MemberService {
//    private final MemberRepository memberRepository = new MemoryMemberRepository();
//    public long join(Member member) {
//        memberRepository.findByName(member.getName());
//        memberRepository.save(member);
//        memberRepository.save(member);
//    }
//}
